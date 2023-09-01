interface IOperacoesBancarias {
  depositar():void;

  sacar():void;
}

class Banco {
  private contas: string[]
  constructor() {
    this.contas = []
  }
  listarContas():Array<string> {
    for(const conta of this.contas) {
      console.log(conta)
    }
    return this.contas
  }
}

class Logger {
  logs: string[]

  constructor() {
    this.logs = []
  }

  registrarLog(operacao:string, valor: number) {
    this.logs.push(
    `${operacao} R$${valor} ${new Date().toLocaleString('pt-BR')}`)
    console.log(`${operacao} realizado com sucesso!`)
  }

  retornaOperacaoInvalida(operacao:string) {
    console.log(`Operação de ${operacao} inválida para o valor informado!`)
  }
}

class ContaBancaria implements ContaBancaria{
  private numeroConta: string
  private saldo: number
  titular: string
  logger = new Logger()
  constructor(numeroConta:string, titular:string, saldo: number) {
    this.numeroConta = numeroConta
    this.titular = titular
    this.saldo = saldo
  }

  getSaldo () { return this.saldo}

  setSaldo (novoSaldo:number)  {
    this.saldo = novoSaldo
  }
  consultarSaldo ():number { return this.getSaldo() }


  getNumeroConta() { `O número da conta é ${this.numeroConta}`}

  setNumeroConta(numeroContaBancaria:string) {
    if (numeroContaBancaria.length > 20) return 'Número de conta inválido'
    this.numeroConta = numeroContaBancaria
    return 'Número da conta cadastrado!'
  }

  depositar(valorDepositado: number)  {
    if(valorDepositado <= 0) this.logger.retornaOperacaoInvalida('depósito')
    else {
      this.saldo += valorDepositado
      this.logger.registrarLog('Depósito', valorDepositado)
      console.log(this.logger.logs)
    }
  }

  sacar(valorSaque:number) {
    if (valorSaque > this.saldo) this.logger.retornaOperacaoInvalida('saque')
    else this.logger.registrarLog('saque', valorSaque)

  }
}

class ContaPoupanca extends ContaBancaria {
  juros: number

  constructor(numeroConta:string, titular:string, saldo: number, juros:number) {
    super(numeroConta, titular, saldo)
    this.juros = juros
  }
  consultarSaldoComJuros():number {
    return (this.consultarSaldo() * 1) + this.juros
  }
}

const conta2 = new ContaBancaria('12354564549649696496966', 'Matheus', 100)
conta2.depositar(500)
