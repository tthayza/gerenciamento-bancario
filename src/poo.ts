interface IOperacoesBancarias {
  depositar(valor: number): void

  sacar(valor: number): void
}

class Banco {
  contas: ContaBancaria[] = []

  adicionarConta(conta: ContaBancaria) {
    this.contas.push(conta)
  }

  listarContas() {
    return this.contas.map(
      (conta) =>
        `Número da conta: ${conta.getNumeroConta()},  Saldo Atual: ${conta.getSaldo()}`
    )
  }
}

class Logger {
  logs: string[] = []

  registrarLogOperacao(operacao: string, valor: number) {
    this.logs.push(
      `${operacao} R$${valor} ${new Date().toLocaleString('pt-BR')}`
    )
    console.log(`${operacao} realizado com sucesso!`)
  }

  operacaoInvalida(operacao: string) {
    console.log(`Operação de ${operacao} inválida para o valor informado!`)
  }

  listarLogs() {
    return this.logs
  }
}
class ContaBancaria implements IOperacoesBancarias {
  private numeroConta: string
  private saldo: number
  protected titular: string
  protected logger = new Logger()
  constructor(numeroConta: string, titular: string, saldo: number) {
    this.numeroConta = numeroConta
    this.titular = titular
    this.saldo = saldo
  }

  getSaldo() {
    return this.saldo
  }

  setSaldo(novoSaldo: number) {
    this.saldo = novoSaldo
  }
  consultarSaldo(): number {
    return this.getSaldo()
  }

  getNumeroConta() {
    return this.numeroConta
  }

  setNumeroConta(numeroContaBancaria: string) {
    this.numeroConta = numeroContaBancaria
  }

  depositar(valorDepositado: number) {
    if (valorDepositado <= 0) this.logger.operacaoInvalida('depósito')
    else {
      this.saldo += valorDepositado
      this.logger.registrarLogOperacao('Depósito', valorDepositado)
    }
  }

  sacar(valorSaque: number) {
    if (valorSaque > this.saldo) this.logger.operacaoInvalida('saque')
    else {
      this.logger.registrarLogOperacao('Saque', valorSaque)
      this.saldo -= valorSaque
    }
  }
}

class ContaPoupanca extends ContaBancaria {
  private juros: number

  constructor(
    numeroConta: string,
    titular: string,
    saldo: number,
    juros: number
  ) {
    super(numeroConta, titular, saldo)
    this.juros = juros
  }
  consultarSaldo(): number {
    return this.getSaldo() + this.juros
  }
}

console.log('--- Conta Corrente ---')

const contaCorrente = new ContaBancaria('1234567890123456789', 'Matheus', 100)
console.log(contaCorrente.consultarSaldo())
contaCorrente.depositar(500)
console.log(contaCorrente.consultarSaldo())
contaCorrente.sacar(200)
console.log(contaCorrente.consultarSaldo())

console.log('--- Conta Poupança ---')

const contaPoupanca = new ContaPoupanca('12453478111', 'Thayza', 200, 15)
console.log(contaPoupanca.consultarSaldo())
contaPoupanca.depositar(800)
console.log(contaPoupanca.consultarSaldo())
contaPoupanca.sacar(2000)
console.log(contaPoupanca.consultarSaldo())

console.log('--- Banco ---')

const cosmoBank = new Banco()
cosmoBank.adicionarConta(contaCorrente)
cosmoBank.adicionarConta(contaPoupanca)

console.log(cosmoBank.listarContas())
