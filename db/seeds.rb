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
  ["Robert De Niro", "robert_de_niro.jpeg"],
  ["Jack Nicholson", "jack nicholson.jpeg"],
  ["Tom Hanks", nil],
  ["Marlon Brando", nil],
  ["Leonardo DiCaprio", nil],
  ["Humphrey Bogart", nil],
  ["Johnny Depp", nil],
  ["Al Pacino", nil],
  ["Denzel Washington", nil],
  ["Laurence Olivier", nil],
  ["Brad Pitt", nil],
  ["Daniel Day-Lewis", nil],
  ["Tom Cruise", nil],
  ["Cary Grant", nil],
  ["Dustin Hoffman", "dustin hoffman.jpeg"],
  ["Clark Gable", nil],
  ["Sean Penn", nil],
  ["Christian Bale", nil],
  ["Gregory Peck", nil],
  ["Harrison Ford", "harrison ford.jpeg"],
  ["Spencer Tracy", nil],
  ["George Clooney", nil],
  ["Charlton Heston", nil],
  ["Anthony Hopkins", nil],
  ["Russell Crowe", nil],
  ["Katharine Hepburn", "katherine hepburn.jpeg"],
  ["Meryl Streep", nil],
  ["Ingrid Bergman", nil],
  ["Marilyn Monroe", "marilyn monroe.jpeg"],
  ["Jennifer Lawrence", nil],
  ["Kate Winslet", nil],
  ["Elizabeth Taylor", nil],
  ["Cate Blanchett", nil],
  ["Audrey Hepburn", nil],
  ["Helen Mirren", nil],
  ["Bette Davis", nil],
  ["Nicole Kidman", nil],
  ["Sandra Bullock", nil],
  ["Natalie Portman", nil],
  ["Jodie Foster", nil],
  ["Judi Dench", nil],
  ["Amy Adams", nil],
  ["Julia Roberts", nil],
  ["Emma Thompson", nil],
  ["Diane Keaton", nil],
  ["Grace Kelly", nil],
  ["Shirley MacLaine", nil],
  ["Reese Witherspoon", nil],
  ["Charlize Theron", nil],
  ["Judy Garland", nil],
]

actors.each do |actor|
  random_user = users[Faker::Number.between(0, users.length-1)]
  group = Group.create name: "#{actor.first} fan club",
    description: Faker::Lorem.paragraph(10),
    hometown: "New York City, NY",
    group_users_attributes: [
      {
        user_id: random_user.id,
        member_type_id: organizer.id
      }
    ]
    unless actor.last.nil?
      file = File.open("db/seeding_files/groups/#{actor.last}")
      group.image.attach(io: file, filename: actor.last)
    end
  groups << group
end

populate_groups(groups, users)
groups[1..8].each { |group| group.members << kermit}

sleep 1 # Allow active storage time to purge files from s3.
