package com.example.fsanchez.salesapp

import android.content.Context
import android.database.Cursor
import android.database.sqlite.SQLiteDatabase
import com.example.fsanchez.salesapp.schemas.SaleSchema
import com.example.fsanchez.salesapp.schemas.ShopSchema

class DBHandler(context: Context) {

    private val db = DBHelper(context).writableDatabase

    //Shop methods
    fun findShops(): Cursor {
        val query = "SELECT * FROM ${ShopSchema.TABLE_NAME};"
        return db.rawQuery(query, null)
    }

    fun findShopById(id: Int): Cursor {
        val query = "SELECT * FROM ${ShopSchema.TABLE_NAME} WHERE ${ShopSchema.ID} = ?;"
        return db.rawQuery(query, arrayOf(id.toString()))
    }

    //Sale methods
    fun findSalesByShop(idShop: Int): Cursor {
        val query = "SELECT * FROM ${SaleSchema.TABLE_NAME} WHERE ${SaleSchema.ID_SHOP} = ?;"
        return db.rawQuery(query, arrayOf(idShop.toString()))
    }

    fun findSaleById(id: Int): Cursor {
        val query = "SELECT * FROM ${SaleSchema.TABLE_NAME} WHERE ${SaleSchema.ID} = ?;"
        return db.rawQuery(query, arrayOf(id.toString()))
    }
}