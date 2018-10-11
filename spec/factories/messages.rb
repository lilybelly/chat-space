FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    image Rack::Test::UploadedFile.new(File.join(Rails.root, 'spec/fixtures/photo-1537326674031-99287e464df23.jpeg'))
    user
    group
  end
end
