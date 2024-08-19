// Firebase設定
const firebaseConfig = {
    apiKey: "AIzaSyA0xk3nHvgPfuDQyE_YXowfylsCQb3KYf8",
    authDomain: "gsdemo-2.firebaseapp.com",
    databaseURL: "https://gsdemo-2-default-rtdb.firebaseio.com",
    projectId: "gsdemo-2",
    storageBucket: "gsdemo-2.appspot.com",
    messagingSenderId: "458526585283",
    appId: "1:458526585283:web:ecef01720016ec66698d76",
    measurementId: "G-J6FS8G51MP"
  };

  initializeApp(firebaseConfig);
  const database = database();
  
  // 現在の日付を取得
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };
  
  // 筋トレメニューを追加
  $('#add-workout').on('click', function() {
    const exerciseName = $('#exercise-name').val();
    const weight = $('#weight').val();
    const reps = $('#reps').val();
    const date = getCurrentDate();
    const workoutData = {
      exerciseName: exerciseName,
      weight: weight,
      reps: reps
    };
  
    const userId = "userId1"; // ユーザーIDは適宜設定
    const newWorkoutKey = database.ref().child(`users/${userId}/workouts/${date}`).push().key;
  
    database.ref(`users/${userId}/workouts/${date}/${newWorkoutKey}`).set(workoutData)
      .then(() => {
        $('#exercise-name').val('');
        $('#weight').val('');
        $('#reps').val('');
        loadWorkouts();
      });
  });
  
  // 筋トレ履歴を表示
  const loadWorkouts = () => {
    const date = getCurrentDate();
    const userId = "userId1"; // ユーザーIDは適宜設定
  
    database.ref(`users/${userId}/workouts/${date}`).once('value', snapshot => {
      $('#workout-list').empty();
      snapshot.forEach(childSnapshot => {
        const workout = childSnapshot.val();
        $('#workout-list').append(`<li>${workout.exerciseName} - ${workout.weight}kg x ${workout.reps}回</li>`);
      });
    });
  };
  
  // ページロード時に履歴を読み込む
  $(document).ready(function() {
    loadWorkouts();
  });
  