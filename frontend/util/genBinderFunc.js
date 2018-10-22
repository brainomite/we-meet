const genBinderFunc = context => funcNameStr => {
  context[funcNameStr] = context[funcNameStr].bind(context);
};
export default genBinderFunc;
