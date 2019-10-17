package com.example.fsanchez.salesapp.activities

import android.Manifest
import android.annotation.SuppressLint
import android.content.DialogInterface
import android.content.Intent
import android.content.pm.PackageManager
import android.hardware.Camera
import android.location.Location
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v4.app.ActivityCompat
import android.support.v4.content.ContextCompat
import android.support.v7.app.AlertDialog
import android.util.Log
import android.view.View
import android.widget.LinearLayout
import com.example.fsanchez.salesapp.*
import com.example.fsanchez.salesapp.R
import com.example.fsanchez.salesapp.models.Shop
import com.google.android.gms.common.api.ResolvableApiException
import com.google.android.gms.location.*
import com.google.android.gms.tasks.RuntimeExecutionException
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import retrofit2.Retrofit
import retrofit2.Callback
import retrofit2.Call
import retrofit2.Response
import retrofit2.converter.moshi.MoshiConverterFactory


class MainActivity : AppCompatActivity() {

    var mCamera: Camera? = null
    var mPreview: CameraPreview? = null
    var cameraPreview: LinearLayout? = null
    val CAMERA_REQUEST_PERMISSION: Int = 1
    val LOCATION_REQUEST_PERMISSION: Int = 2
    val REQUEST_CHECK_STATE = 12300 // any suitable ID

    var fusedLocationClient: FusedLocationProviderClient? = null

    var shops = listOf<Shop>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

//        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)

//        GlobalScope.launch { requestAPI() }

        GlobalScope.launch {
            val dbHandler = DBHandler(this@MainActivity)
            val cursor = dbHandler.findShops()

            shops = (1 .. cursor.count).map {
                cursor.moveToNext()
                Shop(
                    cursor.getInt(0),
                    cursor.getString(1),
                    cursor.getDouble(2),
                    cursor.getDouble(3),
                    cursor.getString(4)
                )
            }
        }

        checkCameraPermission()
        checkLocationPermission()
    }

    fun requestAPI() {
        val shopService = Retrofit.Builder()
            .baseUrl("http://192.168.1.103:3000/api/")
            .addConverterFactory(MoshiConverterFactory.create())
            .build()
            .create(ShopService::class.java)

        shopService.all().enqueue(object : Callback<List<Shop>> {
            override fun onResponse(call: Call<List<Shop>>, response: Response<List<Shop>>) {
                response.body()?.forEach { println("HOLA_: ${it.name}") }
            }

            override fun onFailure(call: Call<List<Shop>>, t: Throwable) {
                println("MI POLLA GORDA" + t.message)
            }
        })
    }

    private fun checkCameraPermission() {
        if (checkPermission(CAMERA_REQUEST_PERMISSION, Manifest.permission.CAMERA)) {
//            ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.CAMERA), CAMERA_REQUEST_PERMISSION)
            Log.e("LOG", "ENTRO EN EL IF DEL checkCameraPermission")
        } else Log.e("LOG", "ENTRO EN EL ELSE DEL checkCameraPermission")
    }

    private fun checkLocationPermission() {
        if (checkPermission(LOCATION_REQUEST_PERMISSION, Manifest.permission.ACCESS_COARSE_LOCATION, Manifest.permission.ACCESS_FINE_LOCATION)) {
            //ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.ACCESS_COARSE_LOCATION, Manifest.permission.ACCESS_FINE_LOCATION), LOCATION_REQUEST_PERMISSION)
            Log.e("LOG", "ENTRO EN EL IF DEL checkLocationPermission")
        } else Log.e("LOG", "ENTRO EN EL ELSE DEL checkLocationPermission")
    }

    private fun checkPermission(permissionCode: Int, vararg perm:String) : Boolean {
        val havePermissions = perm.toList().all {
            ContextCompat.checkSelfPermission(this,it) == PackageManager.PERMISSION_GRANTED
        }
        if (!havePermissions) {
            if(perm.toList().any {
                    ActivityCompat.shouldShowRequestPermissionRationale(this, it)
                }
            ) {
                ActivityCompat.requestPermissions(this, perm, permissionCode)
            } else {
                ActivityCompat.requestPermissions(this, perm, permissionCode)
            }
            return false
        } else {
            if(permissionCode == LOCATION_REQUEST_PERMISSION) {
                fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)

                val reqSetting = LocationRequest.create().apply {
                    fastestInterval = 2000
                    interval = 2000
                    priority = LocationRequest.PRIORITY_HIGH_ACCURACY
                    smallestDisplacement = 1.0f
                }

                val locationUpdates = object : LocationCallback() {
                    override fun onLocationResult(lr: LocationResult) {
                        Log.e("LOG", lr.toString())
                        Log.e("LOG", "Newest Location: " + lr.locations.last())
                        // do something with the new location...
                        compareLocation(lr.locations.last())
                    }
                }

                fusedLocationClient?.requestLocationUpdates(reqSetting, locationUpdates, null /* Looper */)
            }
        }
        return true
    }

//    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
//        if (requestCode and 0xFFFF == REQUEST_CHECK_STATE) {
//            Log.e("LOG", "Back from REQUEST_CHECK_STATE")
//        }
//    }

    @SuppressLint("MissingPermission")
    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<String>, grantResults: IntArray) {
        when (requestCode) {
            CAMERA_REQUEST_PERMISSION -> {
                // If request is cancelled, the result arrays are empty.
                if ((grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED)) {
                    // permission was granted, yay!
                    if(mCamera == null) {
                        mCamera = Camera.open()
                    }
                    mCamera?.setDisplayOrientation(90)
                    cameraPreview = findViewById<View>(R.id.cPreview) as LinearLayout
                    mPreview = CameraPreview(this, mCamera)
                    cameraPreview?.addView(mPreview)

                    mCamera?.startPreview()
                } else {
                    // permission denied, boo! Disable the functionality that depends on this permission.
//                    ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.CAMERA), CAMERA_REQUEST_PERMISSION)
                    // Cerramos la app por no dar permiso a la cámara
                    finish()
                    System.exit(0)
                }
                return
            }

            LOCATION_REQUEST_PERMISSION -> {
                // If request is cancelled, the result arrays are empty.
                if ((grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED)) {
                    // permission was granted, yay!

                    fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)

                    val reqSetting = LocationRequest.create().apply {
                        fastestInterval = 2000
                        interval = 2000
                        priority = LocationRequest.PRIORITY_HIGH_ACCURACY
                        smallestDisplacement = 1.0f
                    }
                    val builder = LocationSettingsRequest.Builder().addLocationRequest(reqSetting)
                    val client = LocationServices.getSettingsClient(this)

                    client.checkLocationSettings(builder.build()).addOnCompleteListener { task ->
                        try {
                            val state: LocationSettingsStates = task.result.locationSettingsStates
                            Log.e(
                                "LOG", "LocationSettings: \n" +
                                        " GPS present: ${state.isGpsPresent} \n" +
                                        " GPS usable: ${state.isGpsUsable} \n" +
                                        " Location present: " +
                                        "${state.isLocationPresent} \n" +
                                        " Location usable: " +
                                        "${state.isLocationUsable} \n" +
                                        " Network Location present: " +
                                        "${state.isNetworkLocationPresent} \n" +
                                        " Network Location usable: " +
                                        "${state.isNetworkLocationUsable} \n"
                            )
                        } catch (e: RuntimeExecutionException) {
                            if (e.cause is ResolvableApiException) {
                                (e.cause as ResolvableApiException).startResolutionForResult(this@MainActivity, REQUEST_CHECK_STATE)
                            }
                        }
                    }

                    val locationUpdates = object : LocationCallback() {
                        override fun onLocationResult(lr: LocationResult) {
                            Log.e("LOG", lr.toString())
                            Log.e("LOG", "Newest Location: " + lr.locations.last())
                            // do something with the new location...
                            compareLocation(lr.locations.last())
                        }
                    }

                    fusedLocationClient?.requestLocationUpdates(reqSetting, locationUpdates, null /* Looper */)
                } else {
                    // permission denied, boo! Disable the functionality that depends on this permission.
//                    ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.ACCESS_COARSE_LOCATION, Manifest.permission.ACCESS_FINE_LOCATION), LOCATION_REQUEST_PERMISSION)
                    val alertDialog: AlertDialog? = this.let {
                        val builder = AlertDialog.Builder(it)
                        builder.apply {
                            setTitle("Te juramos no hacer nada raro con ella pero...")
                            setMessage("Esta aplicación requiere de los permisos de localización para funcionar correctamente")
                            setNegativeButton("OK") { dialog, _ -> dialog.cancel() }
                        }
                        builder.create()
                    }
                    alertDialog?.show()
                }
                return
            }

            // Add other 'when' lines to check for other permissions this app might request.
            else -> {
                // Ignore all other requests.
            }
        }
    }

    private fun compareLocation(location: Location) {
        val margin = 0.0004
        for(i in shops.indices) {
            if(Math.abs(shops[i].latitude - location.latitude) < margin &&
                Math.abs(shops[i].longitude - location.longitude) < margin) {
                createDialog(shops[i])
                break
            }
        }
    }

    private fun createDialog(shop: Shop) {
        val alertDialog: AlertDialog? = this.let {
            val builder = AlertDialog.Builder(it)
            builder.apply {
                setPositiveButton("ACEPTAR") { _, _ ->
                    startActivity(Intent(this.context, SalesActivity::class.java).apply {
                        putExtra("idShop", shop.id)
                        putExtra("shop", shop.name)
                    })
                }
                setNegativeButton("CANCELAR") { dialog, _ -> dialog.cancel() }
                setMessage("¿Ver las ofertas de ${shop.name}?")
            }
            builder.create()
        }
        alertDialog?.show()
    }

    public override fun onResume() {
        super.onResume()

        if (mCamera == null) {
            mCamera = Camera.open()
        }

        mCamera?.setDisplayOrientation(90)

        if(mPreview == null) { //Hemos cerrado la app previamente
            cameraPreview = findViewById<View>(R.id.cPreview) as LinearLayout
            mPreview = CameraPreview(this, mCamera)
            cameraPreview?.addView(mPreview)

            mCamera?.startPreview()
        } else { //Hemos minimizado la app previamente
            mPreview?.refreshCamera(mCamera)
        }
    }

    override fun onPause() {
        super.onPause()
        //when on Pause, release camera in order to be used from other applications
        releaseCamera()
    }

    private fun releaseCamera() {
        // stop and release camera
        if (mCamera != null) {
            mCamera?.stopPreview()
            mCamera?.setPreviewCallback(null)
            mCamera?.release()
            mCamera = null
        }
    }
}
