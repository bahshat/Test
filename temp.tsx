if (type === 'header' && actions.length > 0) {
  // Append an empty cell for buttons
  headersWithAction = [...headers, { title: '', width: 1 }];
} else {
  headersWithAction = [...headers];
}


const renderCells = (type: 'header' | 'row', item?: any) => {
  const dynamicHeaders = actions.length > 0 && type === 'header'
    ? [...headers, { title: '', width: 1 }]
    : headers;

  return dynamicHeaders.map(({ title, width }, index) => {
    const text = type === 'header' ? title.toUpperCase() : item?.[title];
    const fontWeight = type === 'header' ? 'bold' : 'normal';
    return (
      <Text key={index} style={{ flex: width, paddingHorizontal: 5, fontWeight }}>
        {text}
      </Text>
    );
  });
};



{actions.length > 0 && (
  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
    {actions.map((action, i) => (
      <SecondaryButton
        key={i}
        title={action}
        onClick={() => handleAction?.(index, action)}
      />
    ))}
  </View>
)}

const actionFlex = actions.length * 0.6; // or any suitable value per button
const headersWithAction = actions.length > 0
  ? [...headers, { title: '', width: actionFlex }]
  : headers;


return headersWithAction.map(({ title, width }, index) => {
  const text = type === 'header' ? title.toUpperCase() : title ? item[title] : '';
  return (
    <Text key={index} style={{ flex: width, paddingHorizontal: 5, fontWeight: type === 'header' ? 'bold' : 'normal' }}>
      {text}
    </Text>
  );
});


{actions.length > 0 && (
  <View style={{ flex: actionFlex, flexDirection: 'row', gap: 4 }}>
    {actions.map((action, i) => (
      <SecondaryButton
        key={i}
        title={action}
        onClick={() => handleAction?.(index, action)}
      />
    ))}
  </View>
)}






