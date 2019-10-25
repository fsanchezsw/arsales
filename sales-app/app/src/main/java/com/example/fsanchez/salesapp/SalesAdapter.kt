package com.example.fsanchez.salesapp

import android.content.Context
import android.net.Uri
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.ImageView
import android.widget.TextView
import com.bumptech.glide.Glide
import com.example.fsanchez.salesapp.R.id.*
import com.example.fsanchez.salesapp.models.Sale
import kotlin.math.round

class SalesAdapter(context: Context, sales: Array<Sale>): ArrayAdapter<Sale>(context, 0, sales) {

    override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
        val sale: Sale = getItem(position)

        val view = convertView ?: LayoutInflater.from(context).inflate(R.layout.list_item, parent, false)

        val tvName = view?.findViewById<TextView>(tv_name)
        val tvPrice = view?.findViewById<TextView>(tv_price)
        val tvDiscount = view?.findViewById<TextView>(tv_discount)
        val tvOldPrice = view?.findViewById<TextView>(tv_oldprice)
        val ivImage = view?.findViewById<ImageView>(iv_image)

        tvName?.text = sale.name
        tvPrice?.text = "${sale.price}€"
        tvDiscount?.text = "-${sale.discount}%"
        tvOldPrice?.text = "${round(sale.price + sale.price * sale.discount / 100).toInt()}€"
        ivImage?.let { Glide.with(view).load(sale.imageUrl).into(it) }

        return view
    }
}