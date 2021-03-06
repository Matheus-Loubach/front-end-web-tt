
import { useFormik, yupToFormErrors } from "formik"
import * as yup from 'yup'
import axios from "axios"
import { useState } from 'react';



//juntar os dois input com o msm estilo
const Input = props => (
      <input {...props} className="w-full outline-none p-4 border hover:border-blue-800 rounded-2xl text-birdblue focus:border-blue-800"/>
)


//tratar validação //required campo obrigatorio //.email verificar
const validationSchema = yup.object({
  name: yup.string().required('Digite seu nome'),
  username: yup.string().required('Digite o nome de usuário'),
  email: yup.string().required('Digite seu e-mail').email('E-mail inválido'),
  password: yup.string().required('Digite sua senha'),

 

})



export function Signup({ signInUser }){
  const [error, setError] = useState()
   
  //OnSubmit para mandar os dados para o back
    const formik = useFormik({
      onSubmit: async values => {
        try { 
       const resposta = await axios.post(`${import.meta.env.VITE_API_HOST}/signup`,{
        
        name:     values.name,
        email:    values.email,
        username: values.username,
        password: values.password
        
      })   
     

      setError(null)
      signInUser(resposta.data)
    } catch (error) {

      setError(error.response)
      console.log({ type: typeof error.response, errorData: error.response })
    }

  },

      initialValues:{
       email: '',
       password: ''
      },
      validateOnMount: true,
      validationSchema,
     })

   return(

    
    <div className="h-full flex flex-col justify-center items-center p-12 space-y-6 ">  
         <h1 className="text-3xl justify-center text-center">Crie sua conta</h1>
  
     {/* handleSubmit: add ação no buttom para enviar os dados */}
    <form className="space-y-4" onSubmit={formik.handleSubmit}>


    <div className="space-y-2">

      {/*Nome*/}
    <Input 
      type="text"
      name="name"
      placeholder="Nome"
      value={formik.values.name}
      onChange={formik.handleChange}
      //verificar se ta correto
      onBlur={formik.handleBlur}
      disabled={formik.isSubmitting}
      />
      {/*se tiver tocado no email e tiver erro vai aparecer*/}
      {(formik.touched.name && formik.errors.name) && (
      <div className="text-red-500 text-sm">{formik.errors.name}</div>)}
  
    </div>

    <div className="space-y-2">

      {/*email*/}
      <Input 
      type="text"
      name="email"
      placeholder="E-mail"
      value={formik.values.email}
      onChange={formik.handleChange}
      //verificar se ta correto
      onBlur={formik.handleBlur}
      disabled={formik.isSubmitting}
      />
        {/*se tiver tocado no email e tiver erro vai aparecer*/}
       {(formik.resposta && formik.resposta) && (
    <div className="text-red-500 text-sm">erro</div>)}
      

     </div>
     <div className="space-y-2">

         {/*Usuario*/}
        <Input 
         type="text"
         name="username"
         placeholder="Nome de usuário"
         value={formik.values.username}
         onChange={formik.handleChange}
         //verificar se ta correto
         onBlur={formik.handleBlur}
         disabled={formik.isSubmitting}
         />

           {/*se tiver tocado no email e tiver erro vai aparecer*/}
           {(formik.touched.username && formik.errors.username) && (
         <div className="text-red-500 text-sm">{formik.errors.username}</div>)}
       </div>

       {/*senha*/}
     <div className="space-y-2">

        <Input
        //esconde pass (type)
        type="password" 
        name="password" 
        placeholder="Senha"
        value={formik.values.password}
        onChange={formik.handleChange}
        //verificar se ta correto
        onBlur={formik.handleBlur}
        disabled={formik.isSubmitting}
         />    
          {(formik.touched.password && formik.errors.password) && (
        <div className="text-red-500 text-sm">{formik.errors.password}</div>)}
          
      </div>

      {/*button */}
      <div className="flex items-center justify-center">
      {/* //disabled caso não esteja validado o botão fica off */}
      <button 
      type="submit"
      className="w-full bg-birdblue py-4 rounded-full disabled:opacity-50"
      disabled={formik.isSubmitting || !formik.isValid}      
      >
        {formik.isSubmitting ? "Cadastrando..." : 'Cadastrar'}</button>
       
      </div>
    {error ? <div className='text-red-600 flex items-center justify-center bg-black rounded-full'>Email ou Usúario já existe.</div> : null}
    </form>

    <span className="flex space-x-2 text-sm text-center justify-center">
      <p className="pt-4 text-platinum">Já tem uma conta?</p><a className="pt-4 text-birdblue"href="/login">Acesse</a>
    </span>
 </div>
  )
}