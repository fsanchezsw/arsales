package com.example.fsanchez.salesapp.activities

import android.content.Intent
import android.net.Uri
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import com.bumptech.glide.Glide
import com.example.fsanchez.salesapp.DBHandler
import com.example.fsanchez.salesapp.R
import com.example.fsanchez.salesapp.ShopService
import com.example.fsanchez.salesapp.models.Sale
import kotlinx.android.synthetic.main.activity_sale.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import java.lang.Double
import kotlin.math.round

class SaleActivity : AppCompatActivity() {

    lateinit var sale: Sale

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sale)

        this.title = intent.getStringExtra("sale")

        val shopService = Retrofit.Builder()
            .baseUrl("http://192.168.1.38:3000/api/")
            .addConverterFactory(MoshiConverterFactory.create())
            .build()
            .create(ShopService::class.java)

        shopService.getSale(intent.getIntExtra("idShop", -1), intent.getIntExtra("idSale", -1))
        .enqueue(object : Callback<Sale> {
            override fun onResponse(call: Call<Sale>, response: Response<Sale>) {
                sale = response.body()

                tv_name.text = sale.name
                tv_price.text = "${sale.price}€"
                tv_discount.text = "-${sale.discount}%"
                tv_oldprice.text = "${round(sale.price + sale.price * sale.discount / 100).toInt()}€"
                iv_image?.let { Glide.with(this@SaleActivity).load(sale.imageUrl).into(it) }
            }

            override fun onFailure(call: Call<Sale>, t: Throwable) {
                Log.e("LOG", "ERROR")
            }
        })

//        val dbHandler = DBHandler(this)
//        val cursor = dbHandler.findSaleById(intent.getIntExtra("idSale", -1))
//
//        if(cursor.moveToFirst()) {
//            sale = Sale(
//                id = cursor.getInt(0),
//                name = cursor.getString(1),
//                price = cursor.getDouble(2),
//                discount = cursor.getInt(3),
//                url = cursor.getString(4),
//                imageUrl = cursor.getString(5),
//                idShop = cursor.getInt(6)
//            )
//
//            tv_name.text = sale.name
//            tv_price.text = "${sale.price}€"
//            tv_discount.text = "-${sale.discount}%"
//            tv_oldprice.text = "${round(sale.price + sale.price * sale.discount / 100).toInt()}€"
//        }
    }

    fun goToSaleUrl(view: View) {
        startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(sale.url)))
    }
}
