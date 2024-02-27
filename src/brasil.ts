import cron from 'node-cron'
import { download, extrair, dbfToArray } from './utils'
import { conectar, desconectar, insereProcessos } from './db'

const iniciaProcessoArquivo = async () => {
  try {
    cron.schedule('0 */24 * * *', async () => {
      // await download()
      // await extrair()
      const processos = await dbfToArray()
      const conexao = await conectar()
      try {
        await insereProcessos(conexao, processos)
      } catch (error) {
        console.log(error)
      } finally {
        desconectar(conexao)
      }
    }, {
      runOnInit: true
    })
  } catch (error) {
    console.error(error)
  }
}

export {
  iniciaProcessoArquivo
}