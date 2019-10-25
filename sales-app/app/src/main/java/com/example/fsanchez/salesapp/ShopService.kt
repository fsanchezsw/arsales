package com.example.fsanchez.salesapp

import com.example.fsanchez.salesapp.models.Sale
import com.example.fsanchez.salesapp.models.Shop
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Path

interface ShopService {
    @GET("shops")
    fun all(): Call<List<Shop>>
    //Se sustituirá el método all() por otro que obtenga tiendas por posición, para no traerlas todas

    @GET("shops/{id}")
    fun get(@Path("id") id: Int): Call<Shop>

    @GET("shops/{id}/sales")
    fun allSales(@Path("id") id: Int): Call<List<Sale>>

    @GET("shops/{id}/sales/{fk}")
    fun getSale(@Path("id") id: Int, @Path("fk") fk: Int): Call<Sale>
}