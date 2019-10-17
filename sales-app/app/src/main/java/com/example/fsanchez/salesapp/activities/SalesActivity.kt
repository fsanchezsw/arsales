package com.example.fsanchez.salesapp.activities

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.AdapterView
import com.example.fsanchez.salesapp.R
import com.example.fsanchez.salesapp.DBHandler
import com.example.fsanchez.salesapp.SalesCursorAdapter
import com.example.fsanchez.salesapp.models.Sale
import kotlinx.android.synthetic.main.activity_sales.*

class SalesActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sales)

        this.title = intent.getStringExtra("shop")

        val dbHandler = DBHandler(this)
        val cursor = dbHandler.findSalesByShop(intent.getIntExtra("idShop", -1))
        lv_sales.adapter = SalesCursorAdapter(this, cursor)

        val sales = (1 .. cursor.count).map {
            cursor.moveToNext()
            Sale(
                id = cursor.getInt(0),
                name = cursor.getString(1),
                price = cursor.getDouble(2),
                discount = cursor.getInt(3),
                url = cursor.getString(4),
                imageUri = cursor.getString(5),
                idShop = cursor.getInt(6)
            )
        }

        lv_sales.onItemClickListener = AdapterView.OnItemClickListener { _, _, position, _ ->
            startActivity(Intent(this, SaleActivity::class.java).apply {
                putExtra("idSale", sales[position].id)
                putExtra("sale", sales[position].name)
            })
        }
    }

//    fun requestAPI() {
//        val saleService = Retrofit.Builder()
//            .baseUrl("http://192.168.1.103:3000/api/")
//            .addConverterFactory(MoshiConverterFactory.create())
//            .build()
//            .create(SaleService::class.java)
//
//        saleService.all().enqueue(object : Callback<List<Sale>> {
//            override fun onResponse(call: Call<List<Sale>>, response: Response<List<Sale>>) {
//                response.body()?.forEach { println("HOLA_: ${it.item}") }
//            }
//
//            override fun onFailure(call: Call<List<Sale>>, t: Throwable) {
//                println("MI POLLA GORDA" + t.message)
//            }
//        })
//    }
}
