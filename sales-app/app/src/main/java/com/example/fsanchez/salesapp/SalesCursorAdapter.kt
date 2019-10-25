package com.example.fsanchez.salesapp

import android.content.Context
import android.database.Cursor
import android.net.Uri
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.CursorAdapter
import android.widget.ImageView
import android.widget.TextView
import com.bumptech.glide.Glide
import com.bumptech.glide.request.target.BitmapImageViewTarget
import com.example.fsanchez.salesapp.schemas.SaleSchema
import java.lang.Double
import kotlin.math.round

class SalesCursorAdapter(context: Context, cursor: Cursor): CursorAdapter(context, cursor, FLAG_REGISTER_CONTENT_OBSERVER) {
    override fun newView(context: Context?, cursor: Cursor?, parent: ViewGroup?): View {
        return LayoutInflater.from(context).inflate(R.layout.list_item, parent, false)
    }

    override fun bindView(view: View?, context: Context?, cursor: Cursor?) {
        val tvName = view?.findViewById<TextView>(R.id.tv_name)
        val tvPrice = view?.findViewById<TextView>(R.id.tv_price)
        val tvDiscount = view?.findViewById<TextView>(R.id.tv_discount)
        val tvOldPrice = view?.findViewById<TextView>(R.id.tv_oldprice)
        val ivImage = view?.findViewById<ImageView>(R.id.iv_image)

        val name = cursor?.getString(cursor?.getColumnIndex(SaleSchema.NAME))
        val price = cursor?.getString(cursor?.getColumnIndex(SaleSchema.PRICE))
        val discount = cursor?.getString(cursor?.getColumnIndex(SaleSchema.DISCOUNT))
        val oldPrice = round(Double.parseDouble(price) + Double.parseDouble(price) * Integer.parseInt(discount) / 100).toInt()
        val image = cursor?.getString(cursor?.getColumnIndex(SaleSchema.IMAGE_URL))

        tvName?.text = name
        tvPrice?.text = "$price€"
        tvDiscount?.text = "-$discount%"
        tvOldPrice?.text = "$oldPrice€"
        ivImage?.setImageURI(Uri.parse("https://myspringfield.com/dw/image/v2/AAYL_PRD/on/demandware.static/-/Sites-gc-spf-master-catalog/default/dw6cc89bd7/images/hi-res/P_283651311FM.jpg?sw=2000&sh=2000&sm=fit"))
    }

}