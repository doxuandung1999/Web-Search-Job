<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2"
                          style="color: #4caf50"
                        >
                          Đăng nhập
                        </h1>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>

                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-linkedin-in</v-icon>
                          </v-btn>
                        </div>
                        <h4 class="text-center mt-4">
                          Chắc chắn rằng email nhập đã được đăng ký
                        </h4>
                        <h4 class="text-center mt-4" v-show="isErrorLogin" style="color : red">
                          Email hoặc mật khẩu không chính xác!
                        </h4>
                        <v-form>
                          <v-text-field
                            label="Email"
                            name="Email"
                            v-model="Email"
                            prepend-icon="email"
                            type="text"
                            color="#4caf50"
                            :error-messages="ErrorEmailLogin"
                            @click="ErrorEmailLogin = '',isErrorLogin=false"
                          />

                          <v-text-field
                            id="password"
                            label="Mật khẩu"
                            name="password"
                            v-model="Password"
                            prepend-icon="lock"
                            type="password"
                            color="#4caf50"
                            :error-messages="ErrorPasswordLogin"
                            @click="ErrorPasswordLogin = '' , isErrorLogin=false"
                          />
                        </v-form>
                        <h3 class="text-center mt-4">Quên mật khẩu ?</h3>
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn
                          @click="validateLogin"
                          rounded
                          color="#4caf50"
                          class="mb-6"
                          dark
                          :loading="isLoadingLogin"
                          >Đăng nhập</v-btn
                        >
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                      class="teal accent-3"
                      style="background-color: #4caf50 !important"
                    >
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Xin chào!</h1>
                        <h5 class="text-center">
                          Nhập thông tin tài khoản để truy cập vào hệ thống
                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step++"
                          >Đăng ký</v-btn
                        >
                      </div>
                      <div class="text-center mt-8">
                        <v-btn rounded outlined dark @click="routeHome"
                          >Quay lại trang chủ</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col
                      cols="12"
                      md="4"
                      class="teal accent-3"
                      style="background-color: #4caf50 !important"
                    >
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Chào mừng!</h1>
                        <h5 class="text-center">
                          Để giữ kết nối với hệ thống, vui lòng đăng nhập bằng
                          thông tin tài khoản của bạn
                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--"
                          >Đăng nhập</v-btn
                        >
                      </div>
                      <div class="text-center mt-8">
                        <v-btn rounded outlined dark @click="routeHome"
                          >Quay lại trang chủ</v-btn
                        >
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2"
                          style="color: #4caf50"
                        >
                          Tạo tài khoản
                        </h1>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>

                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-linkedin-in</v-icon>
                          </v-btn>
                        </div>
                        <h4 class="text-center mt-4">
                          Nhập đúng email để đăng ký
                        </h4>
                        <v-form>
                          <v-text-field
                            label="Họ và tên"
                            name="Name"
                            autofocus
                            v-model="UserNameRegister"
                            prepend-icon="person"
                            type="text"
                            color="#4caf50"
                            :error-messages="ErrorName"
                            @click="ErrorName = ''"
                          />
                          <v-text-field
                            label="Email"
                            name="Email"
                            v-model="UserEmailRegister"
                            prepend-icon="email"
                            type="text"
                            color="#4caf50"
                            :error-messages="ErrorEmail"
                             @click="ErrorEmail = ''"
                          />

                          <v-text-field
                            id="password"
                            label="Mật khẩu"
                            name="password"
                            v-model="PasswordRegister"
                            prepend-icon="lock"
                            type="password"
                            color="#4caf50"
                            :error-messages="ErrorPassword"
                            @click="ErrorPassword = ''"
                          />
                          <v-text-field
                            id="password"
                            label="Nhập lại mật khẩu"
                            name="password"
                            v-model="PasswordReTypeRegister"
                            prepend-icon="lock"
                            type="password"
                            color="#4caf50"
                            :error-messages="ErrorPasswordReType"
                            @click="ErrorPasswordReType = ''"
                          />

                          <v-select
                            label="Mục đích sử dụng hệ thống"
                            item-text="name"
                            item-value="last"
                            v-model="RoleSelected"
                            :items="job"
                            return-object
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-n5 mb-6">
                        <v-btn
                          @click="validateRegister"
                          rounded
                          color="#4caf50"
                          dark
                          :loading="isLoadingRegister"
                          >Đăng ký</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "login",

  data: () => ({
    step: 1,
    UserNameRegister: null,
    UserEmailRegister: null,
    PasswordRegister: null,
    PasswordReTypeRegister: null,
    Role: 0,
    Email: null,
    Password: null,
    ErrorName : "",
    ErrorEmail : "",
    ErrorPassword : "",
    ErrorPasswordReType: "",
    ErrorEmailLogin : "",
    ErrorPasswordLogin : "",
    isLoadingRegister : false,
    isLoadingLogin: false,
    isErrorLogin : false,
    RoleSelected: {
      name: "Tìm việc làm",
      value: 0,
    },
    job: [
      {
        name: "Tìm việc làm",
        value: 0,
      },
      {
        name: "Tuyển dụng",
        value: 1,
      },
    ],
  }),
  props: {
    source: String,
  },

  methods: {
     
    validateRegister (){
      var checkRegister = true;
      if(this.UserNameRegister == null){
        this.ErrorName = "Họ và tên không được bỏ trống"
        checkRegister = false;
      }
      if(this.UserEmailRegister == null){
        this.ErrorEmail = "Email không được bỏ trống"
        checkRegister = false;
      }
      if(this.PasswordRegister == null){
        this.ErrorPassword = "Mật khẩu không được bỏ trống"
        checkRegister = false;
      }
      if(this.PasswordReTypeRegister == null){
        this.ErrorPasswordReType = "Mật khẩu không được bỏ trống"
        checkRegister = false;
      }

      if(this.PasswordRegister != null && this.PasswordReTypeRegister != null && this.PasswordRegister != this.PasswordReTypeRegister ){
        this.ErrorPasswordReType = "Mật khẩu nhập lại không chính xác" 
        checkRegister = false;
      }
      this.isLoadingRegister = true
      if(checkRegister){
        this.handleRegister();
      }else{
        this.isLoadingRegister = false
      }

    },
    handleRegister() {
      const data = {
        UserName: this.UserNameRegister,
        UserEmail: this.UserEmailRegister,
        Role: this.RoleSelected.value,
        Password: this.PasswordRegister,
      };

      axios
        .post("users/register", data)
        .then(() => {
          this.isLoadingRegister = false
           this.$router.push({name:'login'});
           
        })
        .catch(() => {
          this.isLoadingRegister = false
          this.ErrorEmail = "Email đã tồn tại"
        });
    },

    validateLogin(){
      var checkLogin = true;
      if(this.Email == null){
        this.ErrorEmailLogin = "Email không được bỏ trống"
        checkLogin = false;
      }
      if(this.Password == null){
        this.ErrorPasswordLogin = "Mật khẩu không được bỏ trống"
        checkLogin = false;
      }
      this.isLoadingLogin = true;
      if(checkLogin){
        this.handleLogin();
      }else{
        this.isLoadingLogin = false;
      }
    },
    handleLogin() {
      const data = {
        UserEmail: this.Email,
        Password: this.Password,
      };

      axios
        .post("users/authenticate", data)
        .then((res) => {
          sessionStorage.setItem("user" ,JSON.stringify(res.data));
          this.isLoadingLogin = false
          this.$router.push({name:'home'});
        })
        .catch(() => {
          this.isLoadingLogin = false
          this.isErrorLogin = true;
        });
    },
    routeHome() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style scoped>
</style>
