export function Cart() {
  return (
    <div className="w-full max-w-7xl mx-auto ">
      <h1 className="font-medium text-2xl text-center my-4">Meu carrinho</h1>
      <section className="flex items-center justify-between border-b-2 border-gray-300">
        <img
          className="w-28"
          src="https://cdn.mkplace.com.br/image/upload/v1715017501/seller-images/vjo7szqpzunudydl8afs.png"
          alt="Logo do produto"
        />
        <strong>Preço: R$1.000</strong>
        <div className="flex items-center justify-center gap-3">
          <button className="bg-slate-600 rounded text-white font-medium flex items-center justify-center px-2">
            -
          </button>
          1
          <button className="bg-slate-600 rounded text-white font-medium flex items-center justify-center px-2">
            +
          </button>
        </div>
        <strong className="float-right">
            Subtotal: R$1.000
        </strong>
      </section>
      <p className="font-bold mt-4">Total: R$1.000</p>
    </div>
  );
}
