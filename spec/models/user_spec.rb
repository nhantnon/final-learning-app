require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { User.create(dob: "02/02/1999",first_name: "Tae", last_name: "Yun", email: "tae@gmail.com", password: "password", password_confirmation: "password", location: "92122") }
  let!(:skill) { user.skills.create!(name: "singing") }

  describe "attributes" do
    it "has a first_name" do
      expect(user.first_name).to eq "Tae"
    end
    it "has a last_name" do
      expect(user.last_name).to eq "Yun"
    end
    it "has an email" do
      expect(user.email).to eq "tae@gmail.com"
    end
    it "has a date of birth" do
      expect(user.dob).to eq Date.new(1999,2,2)
    end
    it "has a location" do
      expect(user.location).to eq "92122"
    end
  end

  describe "association with skills table" do
    it "has skills" do
      expect(user.skills.first.name).to eq "singing"
    end
  end
end
