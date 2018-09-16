# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
sleep 1 # Allow active storage time to purge files from s3.
User.create name: "Kermit the Frog", email: 'kermit@thefrog.com',
            password: 'misspiggy', hometown_id: 1
