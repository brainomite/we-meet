# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'open-uri'
# Deterministicly random
Faker::Config.random = Random.new(42)

Group.destroy_all
User.destroy_all
MemberType.destroy_all
GroupUser.destroy_all

base_avatar_url = "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/"
avatars = []
(1..129).each { |num|  avatars << base_avatar_url + "male/#{num}.png" }
(1..114).each { |num|  avatars << base_avatar_url + "female/#{num}.png" }
avatars.shuffle

organizer = MemberType.create title: "Organizer"
regular_member = MemberType.create title: "Regular Member"

# users
users = []
# kermit
kermit = User.create  name: "Kermit the Frog", email: 'kermit@thefrog.com',
  password: 'misspiggy', hometown_id: 1
file = File.open('db/seeding_files/users/Kermit_the_Frog.jpg')
kermit.avatar.attach(io: file, filename: 'Kermit_the_Frog.jpg')
users << kermit

25.times do |user_num|
  puts "doing user #{user_num}"
  user = User.create name: Faker::Name.unique.name,
    email: Faker::Internet.unique.safe_email,
    password: 'hunter2', hometown_id: 1
  slug = Faker::IDNumber.unique.invalid
  background = "bg#{Faker::Number.between(1, 2)}"
  # avatar = open(Faker::Avatar.image(slug, "260x260", "jpg", nil, background))
  avatar = open(avatars.pop)
  file_name = Faker::File.unique.file_name('',nil,'jpg','')
  user.avatar.attach(io: avatar, filename: file_name)
  users << user
end

group = Group.create name: "July 18's Ruby cohort study group",
  description: Faker::Lorem.paragraph(8),
  hometown: "New York City, NY",
  group_users_attributes: [
    {
      user_id: kermit.id,
      member_type_id: organizer.id
    }
  ]
actors = [
  "Robert De Niro",
  "Jack Nicholson",
  "Tom Hanks",
  "Marlon Brando",
  "Leonardo DiCaprio",
  "Humphrey Bogart",
  "Johnny Depp",
  "Al Pacino",
  "Denzel Washington",
  "Laurence Olivier",
  "Brad Pitt",
  "Daniel Day-Lewis",
  "Tom Cruise",
  "Cary Grant",
  "Dustin Hoffman",
  "Clark Gable",
  "Sean Penn",
  "Christian Bale",
  "Gregory Peck",
  "Harrison Ford",
  "Spencer Tracy",
  "George Clooney",
  "Charlton Heston",
  "Anthony Hopkins",
  "Russell Crowe",
  "Katharine Hepburn",
  "Meryl Streep",
  "Ingrid Bergman",
  "Marilyn Monroe",
  "Jennifer Lawrence",
  "Kate Winslet",
  "Elizabeth Taylor",
  "Cate Blanchett",
  "Audrey Hepburn",
  "Helen Mirren",
  "Bette Davis",
  "Nicole Kidman",
  "Sandra Bullock",
  "Natalie Portman",
  "Jodie Foster",
  "Judi Dench",
  "Amy Adams",
  "Julia Roberts",
  "Emma Thompson",
  "Diane Keaton",
  "Grace Kelly",
  "Shirley MacLaine",
  "Reese Witherspoon",
  "Charlize Theron",
  "Judy Garland",
]

actors.each do |actor|
  random_user = users[Faker::Number.between(0, users.length-1)]
  Group.create name: "#{actor} fan club",
  description: Faker::Lorem.paragraph(10),
  hometown: "New York City, NY",
  group_users_attributes: [
    {
      user_id: random_user.id,
      member_type_id: organizer.id
    }
  ]
end


sleep 1 # Allow active storage time to purge files from s3.
