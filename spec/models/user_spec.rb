require 'rails_helper'

RSpec.describe User, type: :model do
  let(:teacher) { User.create(dob: "02/02/1999",first_name: "Tae", last_name: "Yun", email: "tae@gmail.com", password: "password", password_confirmation: "password") }

  describe "attributes" do
    it "has a first_name" do
      expect(teacher.first_name).to eq "Tae"
    end
    it "has a last_name" do
      expect(teacher.last_name).to eq "Yun"
    end
    it "has an email" do
      expect(teacher.email).to eq "tae@gmail.com"
    end
    it "has a date of birth" do
      expect(teacher.dob).to eq Date.new(1999,2,2)
    end
  end
end
