require 'rails_helper'

RSpec.describe Skill, type: :model do
  let(:skill) { Skill.create(name: "singing") }

  describe "attributes" do
    it "has a name" do
      expect(skill.name).to eq "singing"
    end
  end
end
