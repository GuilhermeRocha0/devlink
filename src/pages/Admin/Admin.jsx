import { useState, useEffect } from 'react'

import './admin.css'
import { Header } from '../../components/Header/Header'
import { Logo } from '../../components/Logo/Logo'
import { Input } from '../../components/Input/Input'

import { MdAddLink } from 'react-icons/md'
import { FiTrash2 } from 'react-icons/fi'

import { db } from '../../services/firebaseConnection'
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc
} from 'firebase/firestore'

import { toast } from 'react-toastify'

export default function Admin() {
  const [nameInput, setNameInput] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [backgroundColorInput, setBackgroundColorInput] = useState('#f1f1f1')
  const [textColorInput, setTextColorInput] = useState('#121212')

  const [links, setLinks] = useState([])

  useEffect(() => {
    const linksRef = collection(db, 'links')
    const queryRef = query(linksRef, orderBy('created', 'asc'))
    onSnapshot(queryRef, snapshot => {
      let lista = []

      snapshot.forEach(doc => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color
        })
      })

      setLinks(lista)
    })
  }, [])

  function handleRegister(e) {
    e.preventDefault()

    if (nameInput === '' || urlInput === '') {
      toast.warn('Preencha todos os campos.')
      return
    }

    addDoc(collection(db, 'links'), {
      name: nameInput,
      url: urlInput,
      bg: backgroundColorInput,
      color: textColorInput,
      created: new Date()
    })
      .then(() => {
        setNameInput('')
        setUrlInput('')
        console.log('Link registrado com sucesso!')
        toast.success('Link registrado com sucesso!')
      })
      .catch(error => {
        console.log('Erro ao registrar. ' + error)
        toast.error('Erro ao salvar o link.')
      })
  }

  async function handleDeleteLink(id) {
    const docRef = doc(db, 'links', id)
    await deleteDoc(docRef)
    toast.success('Link deletado com sucesso!')
  }

  return (
    <div className="admin-container">
      <Header />
      <Logo />

      <form className="form" onSubmit={handleRegister}>
        <label htmlFor="linkNameId" className="label">
          Nome do Link
        </label>
        <Input
          id="linkNameId"
          placeholder="Nome do Link"
          value={nameInput}
          onChange={e => setNameInput(e.target.value)}
        />

        <label htmlFor="linkUrlId" className="label">
          URL do Link
        </label>
        <Input
          type="url"
          id="linkUrlId"
          placeholder="Digite a url..."
          value={urlInput}
          onChange={e => setUrlInput(e.target.value)}
        />

        <section className="container-colors">
          <div>
            <label htmlFor="linkBgColorId" className="label right">
              Fundo do Link
            </label>
            <input
              id="linkBgColorId"
              type="color"
              value={backgroundColorInput}
              onChange={e => setBackgroundColorInput(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="linkColorId" className="label right">
              Cor do Link
            </label>
            <input
              id="linkColorId"
              type="color"
              value={textColorInput}
              onChange={e => setTextColorInput(e.target.value)}
            />
          </div>
        </section>

        {nameInput !== '' && (
          <div className="preview">
            <label className="label">Veja como está ficando 👇</label>
            <article
              className="list"
              style={{
                marginBlock: '0.8rem',
                backgroundColor: backgroundColorInput,
                justifyContent: 'center'
              }}
            >
              <p style={{ color: textColorInput }}>{nameInput}</p>
            </article>
          </div>
        )}

        <button className="btn-register" type="submit">
          Cadastrar
          <MdAddLink size={24} color="#fff" />
        </button>
      </form>

      <h2 className="title">Meus Links</h2>

      {links.map((item, index) => (
        <article
          key={index}
          className="list animate-pop"
          style={{ backgroundColor: item.bg, color: item.color }}
        >
          <p>{item.name}</p>
          <div>
            <button
              className="btn-delete"
              onClick={() => handleDeleteLink(item.id)}
            >
              <FiTrash2 size={18} color="#fff" />
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}
