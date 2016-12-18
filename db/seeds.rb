User.delete_all
Skill.delete_all


tae = User.create(dob: "02/02/02",first_name: "Tae", last_name: "Yun", email: "tae@gmail.com", password: "password", password_confirmation: "password", location: Faker::Address.zip)
skills = ["boxing","mandarin", "singing", "philosophy"]
skills.each do |skill|
  Skill.create!(name: skill)
end

User.create!(dob: "02/02/02", first_name: Faker::Name.first_name,  last_name: Faker::Name.last_name, email: Faker::Internet.email, password: "password", password_confirmation: "password", location: '27 walton drive west hartford ct 06107')
User.create!(dob: "02/02/02", first_name: Faker::Name.first_name,  last_name: Faker::Name.last_name, email: Faker::Internet.email, password: "password", password_confirmation: "password", location: '6009 clerkenwell ct burke va 22015')
User.create!(dob: "02/02/02", first_name: Faker::Name.first_name,  last_name: Faker::Name.last_name, email: Faker::Internet.email, password: "password", password_confirmation: "password", location: '949 laws ct valley park MO 63088')
User.create!(dob: "02/02/02", first_name: Faker::Name.first_name,  last_name: Faker::Name.last_name, email: Faker::Internet.email, password: "password", password_confirmation: "password", location: '29445')
User.create!(dob: "02/02/02", first_name: Faker::Name.first_name,  last_name: Faker::Name.last_name, email: Faker::Internet.email, password: "password", password_confirmation: "password", location: '29445')


