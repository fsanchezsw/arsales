package com.example.fsanchez.salesapp.activities

import android.content.Intent
import android.net.Uri
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.example.fsanchez.salesapp.DBHandler
import com.example.fsanchez.salesapp.R
import com.example.fsanchez.salesapp.models.Sale
import kotlinx.android.synthetic.main.activity_sale.*
import java.lang.Double
import kotlin.math.round

class SaleActivity : AppCompatActivity() {

    lateinit var sale: Sale

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sale)

        this.title = intent.getStringExtra("sale")

        val dbHandler = DBHandler(this)
        val cursor = dbHandler.findSaleById(intent.getIntExtra("idSale", -1))

        if(cursor.moveToFirst()) {
            sale = Sale(
                id = cursor.getInt(0),
                name = cursor.getString(1),
                price = cursor.getDouble(2),
                discount = cursor.getInt(3),
                url = cursor.getString(4),
                imageUri = cursor.getString(5),
                idShop = cursor.getInt(6)
            )

            tv_name.text = sale.name
            tv_price.text = "${sale.price}€"
            tv_discount.text = "-${sale.discount}%"
            tv_oldprice.text = "${round(sale.price + sale.price * sale.discount / 100).toInt()}€"
        }
    }

    fun goToSaleUrl(view: View) {
        startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(sale.url)))
    }
}
