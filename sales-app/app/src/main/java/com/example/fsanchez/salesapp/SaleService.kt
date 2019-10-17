package com.example.fsanchez.salesapp

import com.example.fsanchez.salesapp.models.Sale
import retrofit2.Call
import retrofit2.http.GET

interface SaleService {
    @GET("sales")
    fun all(): Call<List<Sale>>

//    @GET("/users/{user}/repos")
//    fun retrieveRepositories(@Path("user") user: String): Call<List<Repository>>
}