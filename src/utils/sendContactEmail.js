const CONTACT_EMAIL = 'tagnandaren@gmail.com'

async function sendViaWeb3Forms(formData, accessKey) {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      name: formData.name,
      email: formData.email,
      subject: `[Portfolio] ${formData.subject}`,
      message: formData.message,
      from_name: 'Portfolio — Daren Tagnan',
      replyto: formData.email,
    }),
  })

  const result = await response.json()
  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Web3Forms a refusé la requête')
  }
  return result
}

async function sendViaFormSubmit(formData) {
  const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      _subject: `[Portfolio] ${formData.subject}`,
      _replyto: formData.email,
      _template: 'table',
      _captcha: 'false',
    }),
  })

  const result = await response.json()
  const ok = response.ok && (result.success === 'true' || result.success === true)
  if (!ok) {
    throw new Error(result.message || 'FormSubmit a refusé la requête')
  }
  return result
}

export async function sendContactEmail(formData) {
  const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

  if (web3Key && web3Key !== 'votre_cle_ici') {
    return sendViaWeb3Forms(formData, web3Key)
  }

  return sendViaFormSubmit(formData)
}
