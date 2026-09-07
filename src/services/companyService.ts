import { isMockMode, supabase } from '@/lib/supabase'
import { mockStore } from '@/lib/mockData'
import type { Company, CompanyFormData } from '@/types'

export async function fetchCompanies(): Promise<Company[]> {
  if (isMockMode) {
    await delay(200)
    return mockStore.getCompanies()
  }

  const { data, error } = await supabase!
    .from('companies')
    .select('*')
    .order('name', { ascending: true })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function createCompany(form: CompanyFormData): Promise<Company> {
  if (isMockMode) {
    await delay(200)
    return mockStore.createCompany(form.name)
  }

  const { data, error } = await supabase!
    .from('companies')
    .insert({ name: form.name.trim() })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function updateCompany(id: string, form: CompanyFormData): Promise<Company> {
  if (isMockMode) {
    await delay(200)
    return mockStore.updateCompany(id, form.name)
  }

  const { data, error } = await supabase!
    .from('companies')
    .update({ name: form.name.trim() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function deleteCompany(id: string): Promise<void> {
  if (isMockMode) {
    await delay(200)
    mockStore.deleteCompany(id)
    return
  }

  const { error } = await supabase!.from('companies').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

export async function fetchDesigners() {
  if (isMockMode) {
    await delay(150)
    return mockStore.getDesigners()
  }

  const { data, error } = await supabase!
    .from('designers')
    .select('*')
    .order('name', { ascending: true })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function createDesigner(name: string) {
  if (isMockMode) {
    await delay(150)
    return mockStore.createDesigner(name)
  }

  const { data, error } = await supabase!
    .from('designers')
    .insert({ name: name.trim() })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
