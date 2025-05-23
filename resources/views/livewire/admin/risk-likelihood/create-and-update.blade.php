<div>
    <div wire:target="store" wire:loading.class="skeleton" class="p-2">
        <div
            class="py-4 font-extrabold text-transparent divider divider-info bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
            {{ $divider }}</div>
            <form wire:submit.prevent='store'>
                @csrf
                @method('PATCH')
                <div class="w-full max-w-xs sm:max-w-sm xl:max-w-xl form-control">
                    <x-label-req :value="__('Name')" />
                    <x-input wire:model.blur='risk_likelihoods_name' :error="$errors->get('risk_likelihoods_name')" />
                    <x-label-error :messages="$errors->get('risk_likelihoods_name')" />
                </div>
                <div class="w-full max-w-xs sm:max-w-sm xl:max-w-xl form-control">
                    <x-label-req :value="__('Notes')" />
                    <x-input wire:model.blur='notes' :error="$errors->get('notes')" />
                    <x-label-error :messages="$errors->get('notes')" />
                </div>
                <div class="modal-action">
                    <x-btn-save wire:target="store" wire:loading.class="btn-disabled">{{ __('Save') }}</x-btn-save>
                    <x-btn-close wire:target="store" wire:loading.class="btn-disabled" wire:click="$dispatch('closeModal')"
                        >{{ __('Close') }}</x-btn-close>
                </div>
            </form>
        </div>
</div>
