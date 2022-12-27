import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'X-RapidAPI-Key': '2b37e519abmshec079e2241b5aa2p10904ejsna99a57122e4e',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl ='https://coinranking1.p.rapidapi.com';

const createRequest = (url, params) => ({url, headers: cryptoApiHeaders, params: params})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
         getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
         }),
         getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
         }),
         getCryptoHistory: builder.query({
            query: ({coinId, timePeriod}) => createRequest(`/coin/${coinId}/history`, {timePeriod: timePeriod})
         })

    })
})

export const { 
    useGetCryptosQuery, 
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery
} = cryptoApi

