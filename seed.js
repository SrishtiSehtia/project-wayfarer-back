var db = require('./models');

var i = -3;

const cities_list = [
      {
        name: 'San Francisco',
        country: 'USA'
      },
      {
        name: 'Los Angeles',
        country: 'USA'
      },
      {
        name: 'New Delhi',
        country: 'India'
      }
    ];

const posts_list = [
    {
      title: 'Post1',
      description: 'This is the description for Post 1.'
    },
    {
      title: 'Post2',
      description: 'lorem lorem lorem lorem lorem lorem lorem.'
    },
    {
      title: 'post3',
      description: 'YOOOO THIS CITY IS LITTTTTTTTTTT.'
    },
    {
      title: 'Great City',
      description: 'I like it a lot to be honest.'
    },
    {
      title: 'Good',
      description: 'People were very polite.'
    },
    {
      title: 'Would not revisit',
      description: 'Met a lot of rude people when I was sightseeing.'
    },
    {
      title: 'Funky City',
      description: 'The smells take a little getting used to.'
    },
    {
      title: 'Strange',
      description: 'Homeless people here seem really nice for some reason.'
    },
    {
      title: 'Would revisit',
      description: 'Met a lot of interesting people when I was sightseeing.'
    }
  ];

db.Post.remove({}, function(err, posts) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('removed all posts');
  db.Post.create(posts_list, function(err, posts){
    if (err) {
      console.log(err);
      return;
    }
    console.log('created all posts');

    db.City.remove({}, function(err, cities){
      console.log('removed all cities');
      cities_list.forEach(function (cityData) {
        var city = new db.City({
          name: cityData.name,
          country: cityData.country
          //  posts: []
        });
        i=i+3;
        db.Post.findOne({title: posts_list[i].title}, function (err, foundPost) {
          console.log('found post ' + foundPost.title + ' for city ' + city.name);

          if (err) {
            console.log(err);
            return;
          }
          city.posts.push(foundPost);
          console.log(city.posts);
          city.save(function(err, savedCity){
            if (err) {
              return console.log(err);
            }
            console.log('saved ' + savedCity.name);
          });
        });
      });

    })
  })
})


// db.City.remove({}, function(err, cities) {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('removed all cities');
//   db.City.create(cities_list, function(err, cities){
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log('recreated all cities');
//     console.log("created", cities.length, "cities");
//   });
// });
