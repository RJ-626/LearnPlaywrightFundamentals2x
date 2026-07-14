
/* [Task] 8July June 2026 | Create a simple HTML form which contains your email ID, password, remember me functionality, and a sign-up button




HTML:

<!DOCTYPE html>

<html>

<head>

<title>Sign In</title>

</head>

<body style="margin:0; padding:0; background-color:#ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">

<div style="width:420px; max-width:90%; margin:60px auto; padding:20px;">

  <!-- Logo -->

  <div style="text-align:center; margin-bottom:24px; font-size:26px; font-weight:700;">

    <span style="color:#7b2ff7;">T</span><span style="color:#e0218a;">M</span><span style="color:#7b2ff7;">O</span>

    <span style="color:#333; margin-left:6px;">RJWorld</span>

  </div>

  <!-- Subtitle -->

  <p style="text-align:center; font-size:15px; color:#555; font-weight:600; margin:0 0 32px 0;">Sign in to Classic platform</p>

  <form action="/login" method="POST" style="display:flex; flex-direction:column;">

    <!-- Email Field -->

    <label for="username" style="font-size:14px; color:#222; font-weight:500; margin-bottom:6px;">Email address</label>

    <input type="text" id="username" name="username" placeholder="Enter email ID" required

      style="padding:12px 14px; margin-bottom:20px; border:1px solid #d9d9e3; border-radius:6px; font-size:14px; color:#333; outline:none; box-sizing:border-box;">

    <!-- Password Field -->

    <label for="password" style="font-size:14px; color:#222; font-weight:500; margin-bottom:6px;">Password</label>

    <div style="position:relative; margin-bottom:8px;">

      <input type="password" id="password" name="password" placeholder="Enter password" required

        style="padding:12px 40px 12px 14px; border:1px solid #d9d9e3; border-radius:6px; font-size:14px; color:#333; outline:none; box-sizing:border-box; width:100%;">

      <span onclick="var p=document.getElementById('password'); p.type = p.type==='password' ? 'text' : 'password';"

        style="position:absolute; right:12px; top:50%; transform:translateY(-50%); cursor:pointer; color:#888; font-size:16px; user-select:none;">&#128065;</span>

    </div>

    <a href="#" style="font-size:13px; color:#6c5ce7; text-decoration:none; margin-bottom:18px; align-self:flex-start;">Forgot Password?</a>

    <!-- Remember Me Checkbox -->

    <div style="display:flex; align-items:center; margin-bottom:24px;">

      <input type="checkbox" id="rememberMe" name="rememberMe" value="true"

        style="width:16px; height:16px; margin-right:8px; accent-color:#6c5ce7; cursor:pointer;">

      <label for="rememberMe" style="font-size:14px; color:#333; cursor:pointer;">Remember me</label>

    </div>

    <!-- Submit Button -->

    <button type="submit"

      style="background-color:#6c5ce7; color:#ffffff; border:none; padding:13px; border-radius:6px; font-size:15px; font-weight:600; cursor:pointer;">

      Sign in

    </button>

  </form>

</div>

</body>

</html> */