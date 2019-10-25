package com.example.fsanchez.salesapp.activities

import android.content.Intent
import android.database.Cursor
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.AdapterView
import com.example.fsanchez.salesapp.*
import com.example.fsanchez.salesapp.models.Sale
import com.example.fsanchez.salesapp.models.Shop
import kotlinx.android.synthetic.main.activity_sales.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory

class SalesActivity : AppCompatActivity() {

//    private val db = DBHelper(this).writableDatabase
    var sales = listOf<Sale>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sales)

        this.title = intent.getStringExtra("shop")

        val shopService = Retrofit.Builder()
            .baseUrl("http://192.168.1.38:3000/api/")
            .addConverterFactory(MoshiConverterFactory.create())
            .build()
            .create(ShopService::class.java)

        shopService.allSales(intent.getIntExtra("idShop", -1)).enqueue(object : Callback<List<Sale>> {
            override fun onResponse(call: Call<List<Sale>>, response: Response<List<Sale>>) {
                sales = response.body()
                lv_sales.adapter = SalesAdapter(this@SalesActivity, sales.toTypedArray())
            }

            override fun onFailure(call: Call<List<Sale>>, t: Throwable) {
                Log.e("LOG", "ERROR")
            }
        })

//        val dbHandler = DBHandler(this)
//        val cursor = dbHandler.findSalesByShop(intent.getIntExtra("idShop", -1))
//        lv_sales.adapter = SalesCursorAdapter(this, cursor)
//
//        val sales = (1 .. cursor.count).map {
//            cursor.moveToNext()
//            Sale(
//                id = cursor.getInt(0),
//                name = cursor.getString(1),
//                price = cursor.getDouble(2),
//                discount = cursor.getInt(3),
//                url = cursor.getString(4),
//                imageUrl = cursor.getString(5),
//                idShop = cursor.getInt(6)
//            )
//        }

        lv_sales.onItemClickListener = AdapterView.OnItemClickListener { _, _, position, _ ->
            startActivity(Intent(this, SaleActivity::class.java).apply {
                putExtra("idShop", sales[position].idShop)
                putExtra("idSale", sales[position].id)
                putExtra("sale", sales[position].name)
            })
        }
    }
}
