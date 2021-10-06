
'use strict';

const supertest = require('supertest')
const {app} = require('../server.js');

const request = supertest(app);


// ROUTE tests and Error tests start here //
describe('testing routes', () => {
//145
    const user = {
        username:'user19',
        email:'user18@gmail.com',
        password:'1234'
    };
 //144
    const body = {
      email:'user18@gmail.com',
      password:'1234'
  };

  const update = {
    userId:"144",
    desc:"user desc updated "
};

const updateOther = {
  userId:"100",
  desc:"user desc updated "
};



const followYourSelf  = {
 
  userId:"96"

}

const followOther  = {
 
  userId:"102"

}


  
const unfollowOther  = {
 
  userId:"102"

}


  
const unfollowYourSelf = {
 
  userId:"96"

}

const deletebody  = {
 
    userId:"144"

}

const deleteOther  = {
 
  userId:"100"

}


const postbody  = {
 
  userId:"102",
  desc:"new post from user 102 ",
  img:"img.png"

}
const updatepost  =
{
  userId:"102",
  desc:" post  from user 102 updated !!!!!!!!!!!! ",
  img:"img1.png"
}

const likebody  =
{
  userId:"102",
  
}
const deletepost =
{
  userId:"102",
  
}


const conversationBody={
  senderId:19,
  receiverId:20

}


const messageBody ={
  conversationId:"6",
    sender:"19",
    text:"hello user 18 I am user  19 "
}

    // Test POST/signup request
    test('testing POST request to create a new user', async () => {
     console.log('insiiiiide test ');
      let response = await request.post('/api/auth/register').send(user);
  
      console.log('this is the response.body, ', response.body);
  
      expect(response.status).toEqual(200);
      expect(response.body.username).toEqual('user19')
      expect(typeof (response.body.password)).toEqual('string');
      expect(typeof (response.body.email)).toEqual('string');
    });
  
  
    // Test /signin
    test('can signin', async () => {
  
      const response = await request.post('/api/auth/login').send(body);
  
     
      console.log('this is the response.body ',response.body );
  
  
      expect(response.status).toBe(200);
      
      expect(response.body.username).toBeDefined();
      expect(body.email).toEqual(response.body.email);
  
    });

   
 //get user  by id ... read by id//

  it('should get user by id  ', async () => {
    const response = await request.get('/api/users/144');

    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
  });
 
   //PUT request, updates user
    test('can update an existing user', async () => {
  
  
      const response = await request.put('/api/users/144').send(update);
  
      expect(update.userId).toEqual('144')
      console.log(response);
      expect(response.status).toBe(200);
      expect(response.body).toEqual("Account has been updated");
  
    });


    test('can not update an other user account', async () => {
  
  
      const response = await request.put('/api/users/116').send(updateOther);
  
     
      console.log(response);
      expect(response.status).toBe(403);
      expect(response.body).toEqual("You can update only your account!");
  
    });


//follow yourself  //
 it('can not  follow yourself !! ', async () => {
  const response = await request.put('/api/users/96/follow').send(followYourSelf);
  expect(followYourSelf.userId).toEqual('96');
  expect(response.status).toEqual(403);
  expect(response.body).toBeDefined();
  expect(response.body).toEqual("you cant follow yourself");
});


 //follow other users

it('follow other users ', async () => {
  const response = await request.put('/api/users/96/follow').send(followOther);
  expect(followOther.userId).toEqual('102');
  expect(response.status).toEqual(200);
  expect(response.body).toBeDefined();
  expect(response.body).toEqual("user has been followed");
});

//  //unfollow yourself  //
it('cant not  unfollow yourself! ', async () => {
  const response = await request.put('/api/users/96/unfollow').send(unfollowYourSelf);
  expect(unfollowYourSelf.userId).toEqual('96');
  expect(response.status).toEqual(403);
  expect(response.body).toBeDefined();
  expect(response.body).toEqual("you cant unfollow yourself");
});


// //unfollow other users  //
it(' unfollow other users! ', async () => {
  const response = await request.put('/api/users/96/unfollow').send(unfollowOther);
  expect(unfollowOther.userId).toEqual('102');
  expect(response.status).toEqual(200);
  expect(response.body).toBeDefined();
  expect(response.body).toEqual("user has been unfollowed");
});


it(' unfollow other users! ', async () => {
  const response = await request.put('/api/users/95/unfollow').send(unfollowOther);
  expect(unfollowOther.userId).toEqual('102');
  expect(response.status).toEqual(403);
  expect(response.body).toBeDefined();
  expect(response.body).toEqual("you dont follow this user");
});



//  //get user friends  //
it('get user friends ', async () => {
  const response = await request.get('/api/users/friends/102');
 
  expect(response.status).toEqual(200);
  expect(response.body).toBeDefined();
  expect(typeof (response.body)).toEqual('object');
  expect(response.body).toBeDefined();
});


  
//     // DELETE, deletes  other user /accounts
    test('can not DELETE other user accounts', async () => {
      let response = await request.delete('/api/users/116').send(deleteOther)
        
      console.log(' response body for delete:', response.body);
  
      expect(response.status).toBe(403);
      expect(response.body).toEqual("You can delete only your account!");
     
    });


//       // DELETE, delete user account
      test('can DELETE user account', async () => {
        let response = await request.delete('/api/users/144').send(deletebody)
          
        expect(deletebody.userId).toEqual("144")
        console.log(' response body for delete:', response.body);
    
        expect(response.status).toBe(200);
        expect(response.body).toEqual("Account has been deleted");
       
      });
  



   // Test POST/create post
    test('testing POST request to create apost', async () => {
    
       let response = await request.post('/api/posts').send(postbody);
   
       console.log('this is the response.body, ', response.body);
   
       expect(response.status).toEqual(200);
       expect(response.body).toBeDefined();
       expect(postbody.userId).toEqual(response.body.userId);
       expect(postbody.desc).toEqual(response.body.desc);
       expect(postbody.img).toEqual(response.body.img);
      
       expect(typeof (response.body.likes)).toEqual('object');
       expect(typeof (response.body)).toEqual('object');
       expect(typeof (response.body.id)).toEqual('number');
     });
   
  
      //PUT request, updates post
  test('user can update his/her posts ', async () => {
  
  
    const response = await request.put('/api/posts/17').send(updatepost);
    console.log(response);
    expect(response.status).toBe(200);
    expect(updatepost.userId).toEqual('102')
    expect(response.body).toEqual("the post has been updated");

  });

 //get apost 
  it('should get post by id  ', async () => {
    const response = await request.get('/api/posts/17');

    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    expect(typeof (response.body)).toEqual('object');
    expect(typeof (response.body.id)).toEqual('number');
      expect(typeof (response.body.userId)).toEqual('string');
      expect(typeof (response.body.likes)).toEqual('object');
      expect(response.body.id).toEqual(17);
      expect(response.body.userId).toEqual("102")
  });

 //like //dislike apost 

test('user can like posts ', async () => {
  
  
  const response = await request.put('/api/posts/17/like').send(likebody);
  console.log(response);
  expect(response.status).toBe(200);
  expect(likebody.userId).toEqual('102')
  expect(response.body).toEqual("The post has been liked");

});


 test('user can dislike posts ', async () => {
  
  
  const response = await request.put('/api/posts/17/like').send(likebody);
  console.log(response);
  expect(response.status).toBe(200);
  expect(likebody.userId).toEqual('102')
  expect(response.body).toEqual("The post has been disliked");

});

 //get timeline  
it('user can get timeline successfully ', async () => {
  const response = await request.get('/api/posts/timeline/102');

  expect(response.status).toEqual(200);
  expect(response.body).toBeDefined();
  expect(typeof (response.body)).toEqual('object');
  
    
});

  //get user's all posts//get profile page//by username

 it('user can get get usersall posts //get profile page successfully ', async () => {
  const response = await request.get('/api/posts/profile/bbb');

  expect(response.status).toEqual(200);
  expect(response.body).toBeDefined();
  expect(typeof (response.body)).toEqual('object');
  
    expect(response.body[0].userId).toEqual('102');
});

// // //delete post 

test(' user can DELETE his/her post successfully', async () => {
  let response = await request.delete('/api/posts/47').send(deletepost)
    
  expect(deletepost.userId).toEqual("102")
  console.log(' response body for delete:', response.body);

  expect(response.status).toBe(200);
  expect(response.body).toEqual("the post has been deleted");
 
});

 //conversation 
test('testing POST request to create conversation', async () => {
    
  let response = await request.post('/api/conversations').send(conversationBody);

  console.log('this is the response.body, ', response.body);

  expect(response.status).toEqual(200);
  expect(response.body).toBeDefined();
  expect(typeof (conversationBody.senderId)).toEqual('number');
  expect(typeof (conversationBody.receiverId)).toEqual('number');
  expect(typeof (response.body)).toEqual('object');
  
  expect(response.body.members[0]).toEqual("19");
 
  expect(response.body.members[1]).toEqual("20");
  
});

 //get all convs of a user


it('get all user conversations successfully ', async () => {
  const response = await request.get('/api/conversations/19');

  expect(response.status).toEqual(200);
  expect(response.body).toBeDefined();
  expect(typeof (response.body)).toEqual('object');
  
   
});

 // get conv includes two userId//get specific conversation 


it('get all user conversations successfully ', async () => {
  const response = await request.get('/api/conversations/find/19/20');

  expect(response.status).toEqual(200);
  expect(response.body).toBeDefined();
  expect(typeof (response.body)).toEqual('object');
  expect(response.body.members[0]).toEqual("19");
 
  expect(response.body.members[1]).toEqual("20");
   
});

 //message 

test('testing add//post message in specefic conv ', async () => {
    
  let response = await request.post('/api/messages').send(messageBody);

  console.log('this is the response.body, ', response.body);

  expect(response.status).toEqual(200);
  expect(response.body).toBeDefined();
  expect(messageBody.conversationId).toEqual(response.body.conversationId);
  expect(messageBody.text).toEqual(response.body.text);
  expect(messageBody.sender).toEqual(response.body.sender);
  expect(typeof (messageBody.sender)).toEqual('string');
  expect(typeof (messageBody.text)).toEqual('string');
  expect(typeof (response.body)).toEqual('object');
  expect(typeof (response.body.sender)).toEqual('string');
  expect(typeof (response.body.text)).toEqual('string');
  expect(typeof (response.body.id)).toEqual('number');
});

it('get all messages in specefic conversation', async () => {
  const response = await request.get('/api/messages/6');

  expect(response.status).toEqual(200);
  expect(response.body).toBeDefined();
  expect(typeof (response.body)).toEqual('object');

});
})