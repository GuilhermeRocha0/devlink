import { useState, useEffect } from 'react'

import './networks.css'
import { Header } from '../../components/Header/Header'
import { Input } from '../../components/Input/Input'

import { MdAddLink } from 'react-icons/md'

import { db } from '../../services/firebaseConnection'
import { setDoc, doc, getDoc } from 'firebase/firestore'

import { toast } from 'react-toastify'

export default function Networks() {
  const [facebook, setFacebook] = useState('')
  const [instagram, setInstagram] = useState('')
  const [youtube, setYoutube] = useState('')

  useEffect(() => {
    function loadLinks() {
      const docRef = doc(db, 'social', 'link')
      getDoc(docRef).then(snapshot => {
        if (snapshot.data() !== undefined) {
          setFacebook(snapshot.data().facebook)
          setInstagram(snapshot.data().instagram)
          setYoutube(snapshot.data().youtube)
        }
      })
    }

    loadLinks()
  }, [])

  function handleSave(e) {
    e.preventDefault()

    setDoc(doc(db, 'social', 'link'), {
      facebook: facebook,
      instagram: instagram,
      youtube: youtube
    })
      .then(() => {
        console.log('Urls salvas com sucesso!')
        toast.success('Salvo com sucesso!')
      })
      .catch(error => {
        console.log('Erro ao salvar urls. ' + error)
        toast.error('Erro ao salvar URLs.')
      })
  }

  return (
    <div className="admin-container">
      <Header />

      <h1 className="title-social">Suas redes sociais</h1>

      <form className="form" onSubmit={handleSave}>
        <label htmlFor="facebookUrlId" className="label">
          Link do Facebook
        </label>
        <Input
          type="url"
          id="facebookUrlId"
          placeholder="Digite a url..."
          value={facebook}
          onChange={e => setFacebook(e.target.value)}
        />

        <label htmlFor="instagramUrlId" className="label">
          Link do Instagram
        </label>
        <Input
          type="url"
          id="instagramUrlId"
          placeholder="Digite a url..."
          value={instagram}
          onChange={e => setInstagram(e.target.value)}
        />

        <label htmlFor="youtubeUrlId" className="label">
          Link do YouTube
        </label>
        <Input
          type="url"
          id="youtubeUrlId"
          placeholder="Digite a url..."
          value={youtube}
          onChange={e => setYoutube(e.target.value)}
        />

        <button type="submit" className="btn-register">
          Salvar links
          <MdAddLink size={32} color="#fff" />
        </button>
      </form>
    </div>
  )
}
