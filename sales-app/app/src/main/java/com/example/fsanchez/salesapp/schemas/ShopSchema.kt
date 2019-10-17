package com.example.fsanchez.salesapp.schemas

import android.provider.BaseColumns

object ShopSchema : BaseColumns {
    const val TABLE_NAME: String = "Shop"

    const val ID: String = "_id"
    const val NAME: String = "name"
    const val LATITUDE: String = "latitude"
    const val LONGITUDE: String = "longitude"
    const val LOGO_URI: String = "logoUri"
}