# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Group.destroy_all
User.destroy_all
MemberType.destroy_all
GroupUser.destroy_all

# kermit
user = User.create name: "Kermit the Frog", email: 'kermit@thefrog.com',
                   password: 'misspiggy', hometown_id: 1
file = File.open('db/seeding_files/users/Kermit_the_Frog.jpg')
user.avatar.attach(io: file, filename: 'Kermit_the_Frog.jpg')

MemberType.create title: "Organizer"
MemberType.create title: "Regular Member"


sleep 1 # Allow active storage time to purge files from s3.
