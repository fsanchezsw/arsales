package com.example.fsanchez.salesapp.schemas

import android.provider.BaseColumns

object SaleSchema : BaseColumns {
    const val TABLE_NAME: String = "Sale"

    const val ID: String = "_id"
    const val NAME: String = "name"
    const val PRICE: String = "price"
    const val DISCOUNT: String = "discount"
    const val URL: String = "url"
    const val IMAGE_URL: String = "imageUrl"
    const val ID_SHOP: String = "idShop"
}