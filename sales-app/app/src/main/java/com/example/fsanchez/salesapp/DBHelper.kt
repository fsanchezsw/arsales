package com.example.fsanchez.salesapp

import android.content.ContentValues
import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper
import com.example.fsanchez.salesapp.schemas.SaleSchema
import com.example.fsanchez.salesapp.schemas.ShopSchema

class DBHelper(context: Context)
    : SQLiteOpenHelper(context, DB_NAME, null, DB_VERSION) {

    companion object {
        const val DB_NAME: String = "arsales.db"
        const val DB_VERSION: Int = 1

        const val CREATE_SHOP_TABLE = "CREATE TABLE ${ShopSchema.TABLE_NAME}(" +
            "${ShopSchema.ID} INTEGER PRIMARY KEY AUTOINCREMENT, ${ShopSchema.NAME} TEXT NOT NULL, " +
            "${ShopSchema.LATITUDE} REAL NOT NULL, ${ShopSchema.LONGITUDE} REAL NOT NULL, " +
            "${ShopSchema.LOGO_URI} TEXT);"

        const val CREATE_SALE_TABLE = "CREATE TABLE ${SaleSchema.TABLE_NAME}(" +
            "${SaleSchema.ID} INTEGER PRIMARY KEY AUTOINCREMENT, ${SaleSchema.NAME} TEXT NOT NULL, " +
            "${SaleSchema.PRICE} INTEGER NOT NULL, ${SaleSchema.DISCOUNT} REAL NOT NULL, " +
            "${SaleSchema.URL} TEXT NOT NULL, " + "${SaleSchema.IMAGE_URI} TEXT, " + "${SaleSchema.ID_SHOP} INTEGER, " +
            "FOREIGN KEY (${SaleSchema.ID_SHOP}) REFERENCES ${ShopSchema.TABLE_NAME} (${ShopSchema.ID}));"

        const val DROP_SHOP_TABLE = "DROP TABLE IF EXISTS ${ShopSchema.TABLE_NAME};"
        const val DROP_SALE_TABLE = "DROP TABLE IF EXISTS ${SaleSchema.TABLE_NAME};"
    }

    override fun onCreate(db: SQLiteDatabase) {
        db.execSQL(CREATE_SHOP_TABLE)
        db.execSQL(CREATE_SALE_TABLE)

        //Insert data to tables
        //Shop data
        //Data 1
        val shopValues1 = ContentValues()
        shopValues1.put(ShopSchema.NAME, "Springfield")
        shopValues1.put(ShopSchema.LATITUDE, 36.657632)
        shopValues1.put(ShopSchema.LONGITUDE, -4.476555)
        shopValues1.put(ShopSchema.LOGO_URI, "springfield.png")
        db.insert(ShopSchema.TABLE_NAME, null, shopValues1)
        //Data 2
        val shopValues2 = ContentValues()
        shopValues2.put(ShopSchema.NAME, "Cortefiel")
        shopValues2.put(ShopSchema.LATITUDE, 36.657425)
        shopValues2.put(ShopSchema.LONGITUDE, -4.476372)
        shopValues2.put(ShopSchema.LOGO_URI, "cortefiel.png")
        db.insert(ShopSchema.TABLE_NAME, null, shopValues2)
        //Data 3
        val shopValues3 = ContentValues()
        shopValues3.put(ShopSchema.NAME, "Misako")
        shopValues3.put(ShopSchema.LATITUDE, 36.657829)
        shopValues3.put(ShopSchema.LONGITUDE, -4.476493)
        shopValues3.put(ShopSchema.LOGO_URI, "misako.png")
        db.insert(ShopSchema.TABLE_NAME, null, shopValues3)
        //Data 4
        val shopValues4 = ContentValues()
        shopValues4.put(ShopSchema.NAME, "Base")
        shopValues4.put(ShopSchema.LATITUDE, 36.657908)
        shopValues4.put(ShopSchema.LONGITUDE, -4.476499)
        shopValues4.put(ShopSchema.LOGO_URI, "base.png")
        db.insert(ShopSchema.TABLE_NAME, null, shopValues3)
        //Test data
        val shopValuesTest = ContentValues()
        shopValuesTest.put(ShopSchema.NAME, "Springfield")
        shopValuesTest.put(ShopSchema.LATITUDE, 36.714929)
        shopValuesTest.put(ShopSchema.LONGITUDE, -4.477986)
        shopValuesTest.put(ShopSchema.LOGO_URI, "paco.png")
        db.insert(ShopSchema.TABLE_NAME, null, shopValuesTest)

        //Sale data
        //Data 1
        val saleValues1 = ContentValues()
        saleValues1.put(SaleSchema.NAME, "Bermudas de pana")
        saleValues1.put(SaleSchema.PRICE, "19.99")
        saleValues1.put(SaleSchema.DISCOUNT, "20")
        saleValues1.put(SaleSchema.URL, "https://myspringfield.com/es/es")
        saleValues1.put(SaleSchema.IMAGE_URI, "bermudas.png")
        saleValues1.put(SaleSchema.ID_SHOP, "5")
        db.insert(SaleSchema.TABLE_NAME, null, saleValues1)
        //Data 2
        val saleValues2 = ContentValues()
        saleValues2.put(SaleSchema.NAME, "Camiseta hawaiana de temporada")
        saleValues2.put(SaleSchema.PRICE, "9.99")
        saleValues2.put(SaleSchema.DISCOUNT, "50")
        saleValues2.put(SaleSchema.URL, "https://myspringfield.com/es/es")
        saleValues2.put(SaleSchema.IMAGE_URI, "camiseta.png")
        saleValues2.put(SaleSchema.ID_SHOP, "5")
        db.insert(SaleSchema.TABLE_NAME, null, saleValues2)
        //Data 3
        val saleValues3 = ContentValues()
        saleValues3.put(SaleSchema.NAME, "Chaqueta vaquera")
        saleValues3.put(SaleSchema.PRICE, "39.99")
        saleValues3.put(SaleSchema.DISCOUNT, "10")
        saleValues3.put(SaleSchema.URL, "https://myspringfield.com/es/es")
        saleValues3.put(SaleSchema.IMAGE_URI, "chaqueta.png")
        saleValues3.put(SaleSchema.ID_SHOP, "5")
        db.insert(SaleSchema.TABLE_NAME, null, saleValues3)
    }

    override fun onUpgrade(db: SQLiteDatabase, oldVersion: Int, newVersion: Int) {
        db.execSQL(DROP_SALE_TABLE)
        db.execSQL(DROP_SHOP_TABLE)
        onCreate(db)
    }
}