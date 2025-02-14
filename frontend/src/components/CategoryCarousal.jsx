

import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const categories = [
    "MERN Developer ",
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Developer",
    "Data Scientist",
    "DevOps Engineer",
    "Tester Engineer",
    "Cloud Engineer",
    "Cyber Security Specialist",
    "Technical Architect",
    "Graphic Designer",
    "Blackbox Tester",
    "Prompt Engineer"
]
const CategoryCarousal = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

  const searchJobHandler = (query)=>{
    dispatch(setSearchedQuery(query));
    navigate("/browse")

    
  }

    return (
        <div className="category-carousel ">
            <Carousel className="w-1/2 mx-auto my-20  ">
                <CarouselContent className="w-1/2 ">
                    {categories.map((category, index) => (
                        <CarouselItem  className="category-item mx-px ">
                            <Button onClick={()=>searchJobHandler(category)} className="category-button rounded-full bg-[#720947]">{category}</Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="carousel-prev hover" />
                <CarouselNext className="carousel-next" />
            </Carousel>
        </div>
    )
}

export default CategoryCarousal



;
