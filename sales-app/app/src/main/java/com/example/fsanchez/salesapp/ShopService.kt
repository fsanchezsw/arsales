package com.example.fsanchez.salesapp

import com.example.fsanchez.salesapp.models.Shop
import retrofit2.Call
import retrofit2.http.GET

interface ShopService {
    @GET("shops")
    fun all(): Call<List<Shop>>
    //Se sustituirá el método all() por otro que obtenga tiendas por posición, para no traerlas todas
}