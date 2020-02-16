const functions = require("firebase-functions");
const admin = require("firebase-admin");
const ramda = require("ramda");

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();
const settings = firestore.settings({ timestampsInSnapshots: true });

const getUserRef = userId => firestore.doc(`users/${userId}`);

exports.getAllPosts = functions.https.onRequest(async (request, response) => {
  const snapshot = await firestore.collection("posts").get();
  const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  response.json({ posts });
});

exports.incrementCommentCount = functions.firestore
  .document("posts/{postId}/comments/{commentId}")
  .onCreate(async (snapshot, context) => {
    const { postId } = context.params;
    const postRef = firestore.doc(`posts/${postId}`);

    const snap = await postRef.get("comments");
    const comments = snap.get("comments");
    return postRef.update({ comments: comments + 1 });
  });

// We want to count tags, so we need to update amount of tags when post has been created
exports.incrementTagsCount = functions.firestore
  .document("posts/{postId}")
  .onCreate(async (snapshot, context) => {
    const { tags } = snapshot.data();
    if (!tags) return;

    const tagsRef = firestore.doc("tags/tags");
    const oldTags = await tagsRef.get().then(snap => snap.data());
    tags.forEach(tag => {
      oldTags[tag] = oldTags[tag] ? oldTags[tag] + 1 : 1;
    });
    tagsRef.update({ ...oldTags });
  });

exports.updateSubscribers = functions.firestore
  .document("users/{userId}")
  .onUpdate(async (snapshot, context) => {
    const { following: before } = snapshot.before.data();
    const { following: after } = snapshot.after.data();
    const { userId } = context.params;

    if (before.length > after.length) {
      const [followUid] = ramda.difference(before, after);
      const userRef = getUserRef(followUid);
      const { followers } = await userRef.get().then(snap => snap.data());
      return userRef.update({
        followers: ramda.difference(followers, [userId])
      });
    } else if (before.length < after.length) {
      const [followUid] = ramda.difference(after, before);
      const userRef = getUserRef(followUid);
      const { followers } = await userRef.get().then(snap => snap.data());
      return userRef.update({
        followers: ramda.union(followers, [userId])
      });
    }
    return null;
  });

exports.updateUserInformation = functions.firestore
  .document("users/{userId}")
  .onUpdate(async (snapshot, context) => {
    const { displayName: after } = snapshot.after.data();
    const { displayName: before } = snapshot.after.data();
    if (after === before) return;

    const postsRef = firestore
      .collection("posts")
      .where("user.uid", "==", snapshot.id);

    postsRef.get(postSnaps => {
      postSnaps.forEach(doc => {
        doc.ref.update({ "user.displayName": after });
      });
    });
  });
