import React from 'react'
import Navbar from './Shared/Navbar'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import Footer from './Footer'


const About = () => {
    return (
        <div>

            <Navbar />

            <div className='flex mt-6 pb-28'>
                <div className='flex flex-col items-center  mx-12 w-1/2'>

                    <h1 className='text-4xl font-bold mt-2'>Welcome to Career<span className='text-4xl font-bold mt-2 text-[#720947]'>Connect</span></h1>

                    <p className='text-muted-foreground mt-6 text-justify'>

                        Welcome to Career Connect! We are thrilled to have you here, embarking on a journey towards your dream career. At Career Connect, we understand that finding the right job can be a daunting task, which is why we have created a platform that simplifies the job search process. Our mission is to connect talented individuals with reputable employers, fostering a community where opportunities abound. Whether you're a seasoned professional or just starting out, we invite you to explore our platform and discover.<br /><br />

                        Our user-friendly interface allows job seekers to easily navigate through a diverse range of job listings tailored to various industries and skill levels. Whether you are a recent graduate looking for your first role or an experienced professional seeking new challenges, Career Connect is designed to meet your needs.<br /><br />

                        We pride ourselves on providing valuable resources, including resume-building tools, interview tips, and career advice, to empower you in your job search. Our dedicated team is committed to ensuring that you have access to the latest job openings and insights into the job market.

                    </p>


                </div>
                <div className='flex justify-center mx-12 w-1/2 gap-2'>

                    <img src="https://oasisinfobyte.com/image/ab.svg" width="400x700" alt="" />
                </div>

            </div>


            <div className='flex mt-6 pb-28'>
                <div className='flex justify-center mx-12 w-1/2 gap-2'>

                    <img src="https://oasisinfobyte.com/image/wbd.svg" width="400x700" alt="" />
                </div>
                <div className='flex flex-col items-center  mx-12 w-1/2 '>

                    <h1 className='text-4xl font-bold mt-2'>What are <span className='text-4xl font-bold mt-2 text-[#F83002]'>we</span></h1>
                    <p className='text-muted-foreground mt-6 text-justify'>
                        At Career Connect, we are dedicated to bridging the gap between job seekers and employers in an ever-evolving job market. Our platform is designed to empower individuals by providing them with the tools and resources they need to navigate their career paths effectively. We understand that finding the right job can be a daunting task, which is why we strive to create a user-friendly experience that simplifies the job search process. <br /> <br />

                        Our mission is to connect talented professionals with reputable companies, fostering a community where opportunities abound. We believe that every individual deserves a chance to showcase their skills and talents, and our platform serves as a launchpad for their career aspirations. <br /><br />

                        At Career Connect, we prioritize innovation and inclusivity, ensuring that our services cater to a diverse range of industries and job roles. Our team is committed to continuously improving our platform, incorporating user feedback, and leveraging the latest technology to enhance the job search experience.</p>
                </div>
            </div>


            <div className='flex mt-6 pb-28'>
                <div className='flex flex-col items-center  mx-12 w-1/2'>

                    <h1 className='text-4xl font-bold mt-2'>Vision of Career<span className='text-4xl font-bold mt-2 text-[#F83002]'>Connect</span></h1>
                    <p className='text-muted-foreground mt-6 text-justify'>
                        At Career Connect, our vision is to revolutionize the job search experience by creating a seamless and empowering platform that bridges the gap between talent and opportunity. We believe that every individual deserves access to meaningful employment that aligns with their skills, aspirations, and values. Our commitment is to foster a diverse and inclusive environment where job seekers can explore a wide array of career paths, while employers can discover exceptional talent that drives their organizations forward. <br /><br />

                        We envision a future where technology and human connection converge, enabling personalized job recommendations and career development resources tailored to each user’s unique journey. By leveraging innovative tools and data-driven insights, Career Connect aims to simplify the hiring process, making it more efficient and transparent for both candidates and employers. <br /><br />

                        Our ultimate goal is to empower individuals to take charge of their careers, providing them with the resources and support they need to thrive in an ever-evolving job market. We aspire to be the go-to platform for career advancement, where dreams are transformed into reality, and every connection made leads to a brighter future.</p>
                </div>
                <div className='flex justify-center mx-12 w-1/2 gap-2'>
                    <img src="https://oasisinfobyte.com/image/Cyborg-bro%20(1).svg" width="400x700" alt="" />
                </div>
            </div>


            <div className='flex mt-6 pb-28'>
                <div className='flex justify-center mx-12 w-1/2 gap-2 '>

                    <img src="https://oasisinfobyte.com/image/Server-rafiki%20(1).svg" width="500x800" alt="" />
                </div>
                <div className='flex flex-col items-center  mx-12 w-1/2 '>

                    <h1 className='text-4xl font-bold mt-2'>Services <span className='text-4xl font-bold mt-2 text-[#F83002]'>we provide</span></h1>
                    <p className='text-muted-foreground mt-6 text-justify'>
                        We provide personalized job matching services, ensuring that candidates receive recommendations tailored to their skills and career aspirations.
                        For employers, Career Connect offers robust recruitment tools that streamline the hiring process. Our services include job posting, applicant tracking, and advanced analytics to help organizations make informed hiring decisions. We also facilitate employer branding, allowing companies to showcase their culture and values to attract top talent. <br /><br />

                        In addition, we host career development resources such as resume writing workshops, interview preparation sessions, and skill enhancement courses, empowering job seekers to present their best selves to potential employers. Our commitment to fostering a supportive community is reflected in our networking events and mentorship programs, which connect aspiring professionals with industry leaders. At Career Connect, we believe in creating opportunities for growth and success, making us the go-to platform for all your career needs. Join us today and take the next step in your professional journey!
                    </p>
                </div>
            </div>


            <div className='flex mt-6 pb-28'>
                <div className='flex flex-col mx-12 w-1/2 gap-10'>
                    <h1 className='text-4xl font-bold mt-2'>Quick <span className='text-4xl font-bold mt-2 text-[#F83002]'>FAQ's</span></h1>
                    <Accordion type="single" collapsible >
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-lg">Are we capable to find you a Job ?</AccordionTrigger>
                            <AccordionContent className="font-medium">
                                Yes. we are capable, user can apply to their dream job in just one click and in past we have provided jobs to more than 1000 people.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger className="text-lg">Do we charge for our service ?</AccordionTrigger>
                            <AccordionContent className="font-medium">
                                No, we do not charge for any of our service candidated can join us for free.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger className="text-lg">Do we have any eligibility criteria ?</AccordionTrigger>
                            <AccordionContent className="font-medium">
                                There is only one eligibility criteria that the candidate must be 18 years old and above.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger className="text-lg">Do we provide any training ?</AccordionTrigger>
                            <AccordionContent className="font-medium">
                                As of now we do not provide any type of training but we are working on that and make it happen soon.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                            <AccordionTrigger className="text-lg">Companies we do collaboration time to time?</AccordionTrigger>
                            <AccordionContent className="font-medium">
                                Microsoft, Google, Amazon, and many more companies we do collaboration time to time.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-6">
                            <AccordionTrigger className="text-lg">How to contact?</AccordionTrigger>
                            <AccordionContent className="font-medium">
                                Kindly email us on info@careerconnect.com or call us on +91-9876543210.
                            </AccordionContent>
                        </AccordionItem>

                    </Accordion>
                </div>
                <div className='flex justify-center  mx-12 w-1/2 gap-2 '>

                    <img src="https://oasisinfobyte.com/image/FAQs-amico%20(1)%20(1).svg" width="400x700" alt="" />
                </div>
            </div>

            <Footer/>

        </div>


    )
}

export default About
