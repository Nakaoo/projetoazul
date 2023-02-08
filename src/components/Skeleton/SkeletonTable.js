function SkeletonTable() {
    const Tr = () => (
      <tr>
        <td className="ant-table-cell p-3">
          <div style={{ width: '100%' }} className="skeleton">
            &nbsp;
          </div>
        </td>
        <td className="ant-table-cell p-3">
          <div style={{ width: '100%' }} className="skeleton">
            &nbsp;
          </div>
        </td>
        <td className="ant-table-cell p-3">
          <div style={{ width: '100%' }} className="skeleton">
            &nbsp;
          </div>
        </td>
      </tr>
    );
  
    return (
      <div className="ant-table">
        <div className="ant-table-container">
          <div className="ant-table-content">
            <table style={{ 'table-layout': 'auto' }}>
              <tbody className="ant-table-tbody">
                {[1, 2, 3, 4, 5].map(item => (
                  <Tr key={item} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  
  export default SkeletonTable;
  