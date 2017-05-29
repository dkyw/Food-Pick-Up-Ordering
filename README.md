# Food Pick-up Ordering (Midterm Project)

A food ordering experience for a single restaurant. Hungry clients of this fictitious restaurant can visit its website, select one or more dishes and place an order for pick-up. They will receive a notification when their order is ready.

The restaurant and client both need to be notified since this app serves as a middle-man. We use a modern telecomm API service, Twilio to implement the communication from the website to the client and restaurant.

When an order is placed the restaurant is phoned and the order is read out to them. We created a separate page which the restaurant can see the summary of orders and the restaurant can then specify how long it will take to fulfill it. Once they provide this information, the website updates for the client and also notifies them via SMS.

## Screenshots

!["screenshot of main index page"](https://github.com/ervinlouieong/Food-Pick-up-Ordering/blob/master/docs/screenshot%20of%20main%20index%20page.png)
!["screenshot of the menu with sliding Order/Cart sidebar in the main index page"](https://github.com/ervinlouieong/Food-Pick-up-Ordering/blob/master/docs/screenshot%20of%20the%20menu%20with%20sliding%20Order:Cart%20sidebar%20in%20the%20main%20index%20page.png)
!["screenshot of the summary of orders page"](https://github.com/ervinlouieong/Food-Pick-up-Ordering/blob/master/docs/screenshot%20of%20the%20sample%20specific%20orders%20page.png)
!["screenshot of the sample specific orders page"](https://github.com/ervinlouieong/Food-Pick-up-Ordering/blob/master/docs/screenshot%20of%20the%20summary%20of%20orders%20page.png)

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
