package com.example.fsanchez.salesapp.models

data class Sale(
    val id: Int,
    val name: String,
    val price: Double,
    val discount: Int,
    val url: String,
    val imageUri: String?,
    val idShop: Int?
)