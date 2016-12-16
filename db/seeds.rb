User.delete_all
Session.delete_all
Course.delete_all
Review.delete_all


teacher = User.create(dob: "02/02/02",first_name: "Tae", last_name: "Yun", email: "tae@gmail.com", password: "password", password_confirmation: "password")
student = User.create(dob: "02/02/02",first_name: "Matt", last_name: "Dimesky", email: "matt@gmail.com", password: "password", password_confirmation: "password")
course = Course.new(price: "$300", subject: "computers", description: "They suck", location: "San Diego")

course.teacher = teacher
course.save

session = course.sessions.new(location: "San Diego", time: "Mon, 01 Jan -4712")

session.students << student
session.save

