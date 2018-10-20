# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'open-uri'
require 'set'

# Deterministicly random
Faker::Config.random = Random.new(42)

def populate_groups(groups, users)
  groups.each do |group|
    # debugger
    available_users = users - group.members
    users_to_select = Faker::Number.between(0, available_users.length-1)
    users_to_select.times do
      random_idx = Faker::Number.between(0, available_users.length-1)
      random_user = available_users[random_idx]
      group.members << random_user
      available_users.delete(random_user)
    end
    puts "Added #{users_to_select} users to group '#{group.name}'"
  end
end

def get_name(used_names, is_male)
  name = nil
  until name && !used_names.include?(name)
    if is_male
      name = Faker::Name.male_first_name
    else
      name = Faker::Name.female_first_name
    end
    name += " #{Faker::Name.last_name}"
  end
  used_names << name
  name
end

def gen_email_from_name(name)
  prefix = "#{name[0]}#{name.split(' ').last}"
  Faker::Internet.unique.email(prefix)
end

def get_avatar(avatars, is_male)
  if is_male
    available_avatars = avatars[:males]
  else
    available_avatars = avatars[:females]
  end
  random_idx = Faker::Number.between(0, available_avatars.length-1)
  available_avatars.delete_at(random_idx)
end

Group.destroy_all
User.destroy_all
MemberType.destroy_all
GroupUser.destroy_all

avatar_url = "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/"
avatars = {males: [], females: []}
(1..129).each { |num|  avatars[:males] << avatar_url + "male/#{num}.png" }
(1..114).each { |num|  avatars[:females] << avatar_url + "female/#{num}.png" }

organizer = MemberType.create id: 1,title: "Organizer"
regular_member = MemberType.create id: 5, title: "Member"

# users
users = []
# kermit
kermit = User.create  name: "Kermit the Frog", email: 'kermit@thefrog.com',
  password: 'misspiggy', hometown_id: 1
file = File.open('db/seeding_files/users/Kermit_the_Frog.jpg')
kermit.avatar.attach(io: file, filename: 'Kermit_the_Frog.jpg')
# users << kermit

used_user_names = Set.new
25.times do |user_num|
  is_male = Faker::Boolean.boolean
  name = get_name(used_user_names, is_male)
  user = User.create name: name,
    email: gen_email_from_name(name),
    password: 'hunter2', hometown_id: 1

  avatar = open(get_avatar(avatars, is_male))
  file_name = Faker::File.file_name('',nil,'jpg','')
  user.avatar.attach(io: avatar, filename: file_name)
  users << user
  puts "create user '#{user.name}'"
end

groups = []
group = Group.create name: "July 18's Ruby cohort study group",
  description: Faker::Lorem.paragraph(8),
  hometown: "New York City, NY",
  group_users_attributes: [
    {
      user_id: kermit.id,
      member_type_id: organizer.id
    }
  ]
groups << group
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
  group = Group.create name: "#{actor} fan club",
  description: Faker::Lorem.paragraph(10),
  hometown: "New York City, NY",
  group_users_attributes: [
    {
      user_id: random_user.id,
      member_type_id: organizer.id
    }
  ]
  groups << group
end

populate_groups(groups, users)
sleep 1 # Allow active storage time to purge files from s3.
