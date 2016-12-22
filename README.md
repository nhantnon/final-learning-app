# levelUp

##Project Name

##Names and GitHub handle for people on the team

- Nhan Nguyen ([nhantnon](https://github.com/nhantnon))
- Cory Mathis ([coryrmathis](https://github.com/coryrmathis))
- Matthew Dimesky([dimesky](https://github.com/dimesky))
- Tae Jun Yun ([yuntsj](https://github.com/yuntsj))

##Description of project

###Model Schema
![](readme-assets/final_schema.png)

##How to install the code locally
1. Fork the repo and clone your fork to your local machine.
2. Run `bundle install`
3. Run `be rake db:reset` to create and seed the database.
4. Make sure to run `redis-server` first, then`rails s` in a different tab to support websockets for chat functionality.

##How to use the app
1. Navigate to localhost:3000
2. Read the instructions in the info sidebar.
3. Register or login.
4. Search our users by skill and location(zipcode)
5. Connect with users by using the in app chatting function.


##License
 MIT