import { useState,useEffect } from 'react'
import { fetchDataFromApi } from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter,Route,Routes } from 'react-router-dom'

import Header from './components/header/header'
import Footer from './components/footer/footer'
import Home from './pages/home/home'
import Details from "./pages/details/Detail"
import SearchResult from "./pages/searchResult/SearchResult"
import PageNotFound from './pages/404/PageNotFound'
import Exploree from './pages/exploree/Exploree'
import { getAPiConfiguration,getGeneres } from './store/homeslice'


function App() {
  const dispatch = useDispatch();
  const url = useSelector((state)=>
  state.home.url)
  useEffect(()=>{
    fetchApiConfig()
    generesCall()
  },[])
  const fetchApiConfig = ()=>{
    fetchDataFromApi("/configuration")
      .then((res)=>{
        
        const url={
          backdrop:res.images.secure_base_url + "original",
          poster:res.images.secure_base_url + "original",
          profile:res.images.secure_base_url + "original",
        }

        dispatch(getAPiConfiguration(url))
      })
  }

  const generesCall = async()=>{
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    console.log(data);
    data.map(({genres})=>{
      return genres.map((item)=>(allGenres[item.id] = 
        item))
    })

    dispatch(getGeneres(allGenres));
  }
  return(
     <BrowserRouter>
     <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Exploree/>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer/>
     </BrowserRouter>
  ) 
     
      
    
}

export default App
