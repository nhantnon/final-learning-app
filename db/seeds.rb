User.delete_all
Skill.delete_all

User.create(dob: "01/01/01",first_name: "test", last_name: "test", email: "test@test.com", password: "testing", password_confirmation: "testing", location: "92122")
tae = User.create(dob: "02/02/02",first_name: "Tae", last_name: "Yun", email: "tae@gmail.com", password: "password", password_confirmation: "password", location: Faker::Address.zip)
@skills = ["Sports", "Language", "Music", "Philosophy", "Technology", "Math", "Science", "The Arts"]
@skills.each do |skill|
  Skill.create!(name: skill)
end

User.create!(dob: "02/02/02", first_name: Faker::Name.first_name,  last_name: Faker::Name.last_name, email: Faker::Internet.email, password: "password", password_confirmation: "password", location: "63088")
User.create!(dob: "02/02/02", first_name: Faker::Name.first_name,  last_name: Faker::Name.last_name, email: Faker::Internet.email, password: "password", password_confirmation: "password", location: "63088")

25.times do
  User.create!(dob: "02/02/02", first_name: Faker::Name.first_name,  last_name: Faker::Name.last_name, email: Faker::Internet.email, password: "password", password_confirmation: "password", location: "92103")
end

User.all.each do |user|
    user.skills << Skill.all.sample
end
