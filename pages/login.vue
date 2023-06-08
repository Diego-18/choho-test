<template>
  <div id="container__ppal">
    <div>
      <v-container>
        <v-flex>
          <v-card light tag="section" class="card-login">
            <v-divider />
            <v-card-text>
              <p>Ingresa con tus credenciales:</p>
              <v-form>
                <v-text-field
                  v-model="email"
                  dense
                  label="Correo Electrónico"
                  type="email"
                  outlined
                  :rules="requiredField"
                />
                <v-text-field
                  v-model="password"
                  dense
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  label="Contraseña"
                  outlined
                  :rules="requiredField"
                  @click:append="showPassword = !showPassword"
                />
              </v-form>
            </v-card-text>
            <v-divider />
            <v-card-actions class="pa-3">
              <v-spacer />
              <v-btn
                depressed
                color="primary"
                type="submit"
                @click="handleSubmit"
              >
                <v-icon left> mdi-lock </v-icon>
                Ingresar
              </v-btn>
            </v-card-actions>
            <v-divider />
          </v-card>
        </v-flex>
      </v-container>
    </div>
    <alerts v-if="showAlert" :text="textAlert" :type="typeAlert" />
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  useContext,
  useRouter,
} from '@nuxtjs/composition-api'
import BackendService from '@/services/Services'
import alerts from '@/components/Shared/Alerts/Alerts'
import { requiredField } from '@/widgets/Validate'
import { MESSAGE_TYPES } from '@/widgets/Messages'

export default defineComponent({
  name: 'LoginPage',
  components: {
    alerts,
  },
  layout: 'login',
  setup() {
    /** DATA */
    const { $auth } = useContext()
    const email = ref('')
    const password = ref('')
    const showAlert = ref(false)
    const textAlert = ref('')
    const typeAlert = ref('')
    const router = useRouter()
    const backendService = ref(new BackendService())
    const route1 = ref({
      path: '/change-password',
    })

    const route2 = ref({
      path: '/new-users',
    })
    const showPassword = ref(false)

    /** METHODS */
    const handleSubmit = async () => {
      const data = {
        email: email.value,
        password: password.value,
      }

      if (email.value === '' || password === '') {
        showAlert.value = true
        textAlert.value = 'Existen campos obligatorios vacios.'
        typeAlert.value = MESSAGE_TYPES.ERROR

        setTimeout(() => {
          showAlert.value = false
        }, 3000)
      } else {
        await $auth
          .loginWith('laravelSanctum', { data })
          .then((response) => {
            backendService.value.getMe().then((data) => {
              router.push('/orders')
              localStorage.setItem('userId', data.id)
              localStorage.setItem('userName', data.name)
              localStorage.setItem('userEmail', data.email)
            })
          })
          .catch((error) => {
            if (error) {
              showAlert.value = true
              textAlert.value =
                'No se puede iniciar la aplicación, contacte con el Administrador por: ' +
                error.response.data.message
              typeAlert.value = MESSAGE_TYPES.ERROR
              setTimeout(() => {
                showAlert.value = false
                // router.push('/login')
              }, 3000)
            }
          })
      }
    }

    return {
      email,
      password,
      showAlert,
      textAlert,
      route1,
      route2,
      showPassword,
      typeAlert,
      backendService,
      requiredField,
      handleSubmit,
    }
  },
})
</script>

<style scoped>
#container__ppal {
  background: url(/background.jpg);
  width: 100vw;
  height: 100vh;
  background-size: cover;
  overflow-y: none;
}

.card-login {
  width: 40rem;
  padding: 1rem;
  margin: 10rem auto;
}

.alert-login {
  margin: 0 auto;
}
</style>
