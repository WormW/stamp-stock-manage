import { useState } from 'react'
import { Plus, Search, Package, DollarSign, Tag, X, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Stamp {
  id: string
  name: string
  code: string
  faceValue: number
  quantity: number
  category: string
  imageUrl?: string
}

const INITIAL_DATA: Stamp[] = [
  { 
    id: '1', 
    name: '龙年邮票', 
    code: '2024-01', 
    faceValue: 1.20, 
    quantity: 100, 
    category: '生肖',
    imageUrl: 'https://placehold.co/400x300/e63946/ffffff?text=Dragon+2024'
  },
  { 
    id: '2', 
    name: '长城风光', 
    code: 'GW-001', 
    faceValue: 0.80, 
    quantity: 500, 
    category: '风景',
    imageUrl: 'https://placehold.co/400x300/457b9d/ffffff?text=Great+Wall'
  },
  { 
    id: '3', 
    name: '熊猫纪念', 
    code: 'PD-2023', 
    faceValue: 2.00, 
    quantity: 50, 
    category: '动物',
    imageUrl: 'https://placehold.co/400x300/1d3557/ffffff?text=Panda'
  },
]

export function StampManager() {
  const [stamps, setStamps] = useState<Stamp[]>(INITIAL_DATA)
  const [isAdding, setIsAdding] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  
  // Form state
  const [newItem, setNewItem] = useState<Omit<Stamp, 'id'>>({
    name: '',
    code: '',
    faceValue: 0,
    quantity: 0,
    category: '',
    imageUrl: ''
  })

  const handleAdd = () => {
    const stamp: Stamp = {
      ...newItem,
      id: Math.random().toString(36).substr(2, 9),
      imageUrl: newItem.imageUrl || `https://placehold.co/400x300/gray/white?text=${encodeURIComponent(newItem.name || 'No Image')}`
    }
    setStamps([stamp, ...stamps])
    setIsAdding(false)
    setNewItem({ name: '', code: '', faceValue: 0, quantity: 0, category: '', imageUrl: '' })
  }

  const filteredStamps = stamps.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalQuantity = stamps.reduce((acc, s) => acc + s.quantity, 0)
  const totalValue = stamps.reduce((acc, s) => acc + (s.quantity * s.faceValue), 0)
  const categories = new Set(stamps.map(s => s.category)).size

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">库存总量</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuantity}</div>
            <p className="text-xs text-muted-foreground">库存项目数</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总价值</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥{totalValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">面值总计</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">分类数</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories}</div>
            <p className="text-xs text-muted-foreground">当前分类</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索邮票..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsAdding(!isAdding)}>
          <Plus className="mr-2 h-4 w-4" />
          {isAdding ? '取消' : '添加邮票'}
        </Button>
      </div>

      {/* Add Form */}
      {isAdding && (
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle>新增邮票</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label>邮票名称</Label>
                <Input 
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  placeholder="例如：龙年邮票" 
                />
              </div>
              <div className="space-y-2">
                <Label>编码</Label>
                <Input 
                  value={newItem.code}
                  onChange={(e) => setNewItem({...newItem, code: e.target.value})}
                  placeholder="例如：2024-01" 
                />
              </div>
              <div className="space-y-2">
                <Label>分类</Label>
                <Input 
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  placeholder="例如：生肖" 
                />
              </div>
              <div className="space-y-2">
                <Label>面值 (元)</Label>
                <Input 
                  type="number" 
                  step="0.01"
                  value={newItem.faceValue}
                  onChange={(e) => setNewItem({...newItem, faceValue: parseFloat(e.target.value) || 0})}
                />
              </div>
              <div className="space-y-2">
                <Label>数量</Label>
                <Input 
                  type="number" 
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value) || 0})}
                />
              </div>
              <div className="space-y-2">
                <Label>图片链接 (可选)</Label>
                <Input 
                  value={newItem.imageUrl}
                  onChange={(e) => setNewItem({...newItem, imageUrl: e.target.value})}
                  placeholder="https://..." 
                />
              </div>
              <div className="flex items-end lg:col-span-3">
                <Button className="w-full" onClick={handleAdd}>保存邮票</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* List */}
      <div className="rounded-md border bg-card">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[100px]">图片</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">编码</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">名称</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">分类</th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">面值</th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">数量</th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">总价</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {filteredStamps.length > 0 ? (
                filteredStamps.map((stamp) => (
                  <tr key={stamp.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle">
                      {stamp.imageUrl ? (
                        <div 
                          className="h-12 w-12 cursor-pointer overflow-hidden rounded border hover:opacity-80 transition-opacity"
                          onClick={() => setPreviewImage(stamp.imageUrl || null)}
                        >
                          <img 
                            src={stamp.imageUrl} 
                            alt={stamp.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded border bg-muted">
                          <ImageIcon className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </td>
                    <td className="p-4 align-middle font-medium">{stamp.code}</td>
                    <td className="p-4 align-middle">{stamp.name}</td>
                    <td className="p-4 align-middle">
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        {stamp.category}
                      </span>
                    </td>
                    <td className="p-4 align-middle text-right">¥{stamp.faceValue.toFixed(2)}</td>
                    <td className="p-4 align-middle text-right">{stamp.quantity}</td>
                    <td className="p-4 align-middle text-right">¥{(stamp.faceValue * stamp.quantity).toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-muted-foreground">
                    未找到邮票
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg shadow-2xl">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-white"
              onClick={() => setPreviewImage(null)}
            >
              <X className="h-4 w-4" />
            </Button>
            <img 
              src={previewImage} 
              alt="Preview" 
              className="max-h-[85vh] w-auto object-contain"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
            />
          </div>
        </div>
      )}
    </div>
  )
}
