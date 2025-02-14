Career Connect is a full-featured job portal built using the MERN stack, designed to streamline the job application process for users and provide recruiters with powerful job management tools.

✨ Features
✅ Secure Authentication & Role Management – Users & Admins have separate access with JWT token verification, Email verification, and Password reset via Mailtrap & Nodemailer.
✅ Protected Routes – Ensures that only authenticated users can access specific pages, enhancing security. 🔒
✅ Automated Job Notifications – Cron Jobs notify users whenever a new job is posted, keeping them updated.
✅ Advanced Job Search – Filter jobs based on various criteria to find the perfect fit.
✅ One-Click Job Application – Users can apply instantly with just one click! 🚀
✅ Cloudinary Integration – Resumes are securely uploaded and managed via Cloudinary.
✅ Recruiter Dashboard – Recruiters can Create, Update, and Delete job postings seamlessly.
✅ Optimized API Calls – RTK Query minimizes unnecessary API requests, boosting performance.
✅ Sleek UI & UX – Built with ShadCN UI, Tailwind CSS, and Skeleton Loading effects for a smooth user experience.
✅ State Management – React & Redux handle global state efficiently.
✅ Scalable Backend – Built using MongoDB, Node.js, and Express, ensuring high performance.

🛠️ Tech Stack
Frontend: React, Redux, RTK Query, ShadCN UI, Tailwind CSS
Backend: Node.js, Express.js, MongoDB
Authentication: JWT, Mailtrap, Nodemailer
Storage: Cloudinary (for resumes)
Automation: Cron Jobs (for job notifications)


🚀 Installation & Setup
1️⃣ Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/career-connect.git
cd career-connect

2️⃣ Install dependencies
cd frontend  and cd Job portal i.e the root directory as the code is in development mode so you need to install dependency of backend side in root
npm install  

3️⃣ Configure environment variables
Create a .env file in the backend folder and add:

MONGO_URI=your_mongodb_uri  
JWT_SECRET=your_secret_key  
CLOUDINARY_CLOUD_NAME=your_cloudinary_name  
CLOUDINARY_API_KEY=your_cloudinary_api_key  
CLOUDINARY_API_SECRET=your_cloudinary_secret  
MAILTRAP_USERNAME=your_mailtrap_username  
MAILTRAP_PASSWORD=your_mailtrap_password  

4️⃣ Start the application
In root i.e cd JobPortal run the command on the terminal
npm run dev

📢 Contributing
Feel free to contribute by raising issues, suggesting new features, or submitting pull requests! 🚀

📄 License
This project is open-source and available under the MIT License.
